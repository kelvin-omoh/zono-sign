import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { signLanguageData, getRandomSignsFromCategory, SignLanguageAPI } from '../data/signLanguageData'

const useLessonStore = create(
    persist(
        (set, get) => ({
            // Current lesson state
            currentLessonType: null, // 'common', 'advanced', 'sonic', 'names'
            currentQuizIndex: 0,
            quizProgress: {},

            // Lesson progress
            completedLessons: [],
            streaks: {
                current: 0,
                best: 0
            },
            points: 0,

            // Quiz state
            currentQuiz: null,
            selectedAnswer: null,
            showFeedback: false,
            isCorrect: false,

            // Generate quizzes from sign language data
            generateQuizzesFromSignData: () => {
                const quizzes = {}

                // Map lesson types to sign data categories
                const categoryMapping = {
                    common: 'common',
                    advanced: 'advanced',
                    sonic: 'iconic',
                    names: 'names'
                }

                Object.entries(categoryMapping).forEach(([lessonType, signCategory]) => {
                    const categoryData = signLanguageData[signCategory]
                    if (!categoryData) return

                    quizzes[lessonType] = categoryData.signs.map((sign, index) => {
                        // Generate quiz options locally
                        const wrongAnswers = categoryData.signs
                            .filter(s => s.id !== sign.id)
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 3)
                            .map(s => s.word)

                        const options = [sign.word, ...wrongAnswers]
                            .sort(() => 0.5 - Math.random())

                        return {
                            id: index + 1,
                            question: `What does this sign mean?`,
                            image: sign.imageUrl,
                            word: sign.word,
                            description: sign.description,
                            instructions: sign.instructions,
                            options: options,
                            correctAnswer: sign.word,
                            explanation: `${sign.word}: ${sign.description}. ${sign.instructions}`
                        }
                    })
                })

                return quizzes
            },



            // Quiz data using real sign language content
            quizzes: {},

            // Initialize store with sign language data
            initializeQuizzes: () => {
                const state = get()
                if (Object.keys(state.quizzes).length === 0) {
                    const generatedQuizzes = state.generateQuizzesFromSignData()
                    set({ quizzes: generatedQuizzes })
                }
            },

            // Actions
            setCurrentLessonType: (type) => set({ currentLessonType: type }),

            startQuiz: (lessonType) => {
                const quizzes = get().quizzes[lessonType] || []
                set({
                    currentLessonType: lessonType,
                    currentQuizIndex: 0,
                    currentQuiz: quizzes[0] || null,
                    selectedAnswer: null,
                    showFeedback: false
                })
            },

            selectAnswer: (answer) => {
                const { currentQuiz } = get()
                const isCorrect = answer === currentQuiz?.correctAnswer
                set({
                    selectedAnswer: answer,
                    isCorrect,
                    showFeedback: true
                })
            },

            nextQuiz: () => {
                const { currentLessonType, currentQuizIndex, quizzes, isCorrect, points, streaks } = get()
                const lessonQuizzes = quizzes[currentLessonType] || []
                const nextIndex = currentQuizIndex + 1

                // Update points and streaks if correct
                if (isCorrect) {
                    const newPoints = points + 1
                    const newStreak = streaks.current + 1
                    set({
                        points: newPoints,
                        streaks: {
                            current: newStreak,
                            best: Math.max(streaks.best, newStreak)
                        }
                    })

                    // Trigger achievement for correct answer
                    if (window.achievementStore) {
                        window.achievementStore.onCorrectAnswer()
                    }

                    // Save to Firebase after points update
                    if (window.currentUserId) {
                        setTimeout(() => get().saveToFirebase(window.currentUserId), 100)
                    }
                }

                if (nextIndex < lessonQuizzes.length) {
                    // Next quiz
                    set({
                        currentQuizIndex: nextIndex,
                        currentQuiz: lessonQuizzes[nextIndex],
                        selectedAnswer: null,
                        showFeedback: false,
                        isCorrect: false
                    })
                } else {
                    // Lesson complete
                    const completedLessons = get().completedLessons
                    const isNewCompletion = !completedLessons.includes(currentLessonType)

                    if (isNewCompletion) {
                        const newCompletedLessons = [...completedLessons, currentLessonType]
                        set({
                            completedLessons: newCompletedLessons
                        })

                        // Trigger achievement for lesson completion
                        if (window.achievementStore) {
                            window.achievementStore.onLessonCompleted(get())
                        }

                        // Save to Firebase after lesson completion
                        if (window.currentUserId) {
                            get().saveToFirebase(window.currentUserId)
                        }
                    }

                    set({
                        currentQuiz: null,
                        currentLessonType: 'complete'
                    })
                }
            },

            resetLesson: () => set({
                currentLessonType: null,
                currentQuizIndex: 0,
                currentQuiz: null,
                selectedAnswer: null,
                showFeedback: false,
                isCorrect: false
            }),

            returnToDashboard: () => set({
                currentLessonType: null,
                currentQuiz: null,
                selectedAnswer: null,
                showFeedback: false
            }),

            // Reset all data (for sign out)
            reset: () => set({
                currentLessonType: null,
                currentQuizIndex: 0,
                quizProgress: {},
                completedLessons: [],
                streaks: {
                    current: 0,
                    best: 0
                },
                points: 0,
                currentQuiz: null,
                selectedAnswer: null,
                showFeedback: false,
                isCorrect: false
            }),

            // Firebase data persistence
            saveToFirebase: async (userId) => {
                if (!userId) return

                try {
                    const state = get()
                    const lessonData = {
                        completedLessons: state.completedLessons,
                        streaks: state.streaks,
                        points: state.points,
                        quizProgress: state.quizProgress,
                        updatedAt: new Date()
                    }

                    await setDoc(doc(db, 'userLessons', userId), lessonData)
                    console.log('Lesson data saved to Firebase')
                } catch (error) {
                    console.error('Error saving lesson data to Firebase:', error)
                }
            },

            loadFromFirebase: async (userId) => {
                if (!userId) return

                try {
                    const docRef = doc(db, 'userLessons', userId)
                    const docSnap = await getDoc(docRef)

                    if (docSnap.exists()) {
                        const data = docSnap.data()
                        set({
                            completedLessons: data.completedLessons || [],
                            streaks: data.streaks || { current: 0, best: 0 },
                            points: data.points || 0,
                            quizProgress: data.quizProgress || {}
                        })
                        console.log('Lesson data loaded from Firebase')
                        return data
                    } else {
                        console.log('No lesson data found in Firebase')
                        return null
                    }
                } catch (error) {
                    console.error('Error loading lesson data from Firebase:', error)
                    return null
                }
            },

            clearFirebaseData: async (userId) => {
                if (!userId) return

                try {
                    await setDoc(doc(db, 'userLessons', userId), {
                        completedLessons: [],
                        streaks: { current: 0, best: 0 },
                        points: 0,
                        quizProgress: {},
                        updatedAt: new Date()
                    })
                    console.log('Lesson data cleared from Firebase')
                } catch (error) {
                    console.error('Error clearing lesson data from Firebase:', error)
                }
            }
        }),
        {
            name: 'lesson-storage',
            partialize: (state) => ({
                completedLessons: state.completedLessons,
                streaks: state.streaks,
                points: state.points,
                quizProgress: state.quizProgress
            })
        }
    )
)

// Expose store to window for global access
if (typeof window !== 'undefined') {
    window.lessonStore = useLessonStore.getState()
}

export default useLessonStore 