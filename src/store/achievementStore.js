import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

const useAchievementStore = create(
    persist(
        (set, get) => ({
            // XP and Level System
            totalXP: 0,
            weeklyXP: 0,
            level: 1,
            lastXPDate: null,

            // Achievement Tracking
            unlockedAchievements: [],
            achievementProgress: {},
            newAchievements: [], // Recently unlocked achievements

            // Achievement Definitions
            achievements: [
                {
                    id: 'scholar',
                    title: 'Zero Zone Scholar',
                    description: 'Complete 1 lesson on Zerozone',
                    icon: '🎓',
                    xpReward: 50,
                    type: 'lessons_completed',
                    target: 1,
                    color: 'bg-blue-50 border-blue-200'
                },
                {
                    id: 'magician',
                    title: 'Zero Zone Magician',
                    description: 'Correctly answer any lesson on Zerozone',
                    icon: '🎩',
                    xpReward: 30,
                    type: 'correct_answers',
                    target: 1,
                    color: 'bg-purple-50 border-purple-200'
                },
                {
                    id: 'scientist',
                    title: 'Zero Zone Scientist',
                    description: 'Keep a 2 days streak on Zerozone',
                    icon: '🔬',
                    xpReward: 75,
                    type: 'daily_streak',
                    target: 2,
                    color: 'bg-green-50 border-green-200'
                },
                {
                    id: 'guru',
                    title: 'Zero Zone Guru',
                    description: 'Complete 10 lessons on Zerozone',
                    icon: '🧘',
                    xpReward: 200,
                    type: 'lessons_completed',
                    target: 10,
                    color: 'bg-orange-50 border-orange-200'
                },
                {
                    id: 'master_scholar',
                    title: 'Zero Zone Scholar',
                    description: 'Correctly answer 10 lessons on Zerozone',
                    icon: '📚',
                    xpReward: 150,
                    type: 'correct_answers',
                    target: 10,
                    color: 'bg-indigo-50 border-indigo-200'
                },
                {
                    id: 'celebrity',
                    title: 'Zero Zone Celebrity',
                    description: 'Keep a month streak straight for one month',
                    icon: '⭐',
                    xpReward: 500,
                    type: 'daily_streak',
                    target: 30,
                    color: 'bg-yellow-50 border-yellow-200'
                },
                {
                    id: 'champion',
                    title: 'Zero Zone Champion',
                    description: 'Complete all lessons in the sign language section',
                    icon: '🏆',
                    xpReward: 1000,
                    type: 'all_lessons_completed',
                    target: 1,
                    color: 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                }
            ],

            // XP Actions
            addXP: (amount, source = 'general') => {
                const currentDate = new Date().toDateString()
                const state = get()

                // Reset weekly XP if it's a new week
                const lastDate = state.lastXPDate ? new Date(state.lastXPDate) : new Date()
                const daysDiff = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24))
                const isNewWeek = daysDiff >= 7

                const newTotalXP = state.totalXP + amount
                const newWeeklyXP = isNewWeek ? amount : state.weeklyXP + amount
                const newLevel = Math.floor(newTotalXP / 100) + 1

                set({
                    totalXP: newTotalXP,
                    weeklyXP: newWeeklyXP,
                    level: newLevel,
                    lastXPDate: currentDate
                })

                // Save to Firebase after XP update
                if (window.currentUserId) {
                    setTimeout(() => get().saveToFirebase(window.currentUserId), 200)
                }

                console.log(`+${amount} XP earned from ${source}! Total: ${newTotalXP}`)
            },

            // Achievement Progress Tracking
            updateAchievementProgress: (type, value = 1) => {
                const state = get()
                const currentProgress = state.achievementProgress[type] || 0
                const newProgress = currentProgress + value

                set({
                    achievementProgress: {
                        ...state.achievementProgress,
                        [type]: newProgress
                    }
                })

                // Check for newly unlocked achievements
                get().checkAchievements(type, newProgress)
            },

            // Check and unlock achievements
            checkAchievements: (type, currentValue) => {
                const state = get()
                const relevantAchievements = state.achievements.filter(
                    achievement => achievement.type === type &&
                        !state.unlockedAchievements.includes(achievement.id)
                )

                const newlyUnlocked = []

                relevantAchievements.forEach(achievement => {
                    if (currentValue >= achievement.target) {
                        newlyUnlocked.push(achievement.id)

                        // Add XP reward
                        get().addXP(achievement.xpReward, `achievement: ${achievement.title}`)

                        console.log(`🎉 Achievement unlocked: ${achievement.title}!`)
                    }
                })

                if (newlyUnlocked.length > 0) {
                    set({
                        unlockedAchievements: [...state.unlockedAchievements, ...newlyUnlocked],
                        newAchievements: [...state.newAchievements, ...newlyUnlocked]
                    })

                    // Save to Firebase after achievement unlock
                    if (window.currentUserId) {
                        setTimeout(() => get().saveToFirebase(window.currentUserId), 300)
                    }
                }
            },

            // Special achievement checks
            checkSpecialAchievements: (lessonStore) => {
                const { completedLessons } = lessonStore

                // Check for "all lessons completed" achievement
                if (completedLessons.length >= 4) { // Assuming 4 total lessons
                    get().updateAchievementProgress('all_lessons_completed', 1)
                }
            },

            // Lesson completion tracking
            onLessonCompleted: (lessonStore) => {
                const { completedLessons } = lessonStore

                // Track lessons completed
                get().updateAchievementProgress('lessons_completed', 1)

                // Award XP for lesson completion
                get().addXP(25, 'lesson completed')

                // Check special achievements
                get().checkSpecialAchievements(lessonStore)
            },

            // Correct answer tracking
            onCorrectAnswer: () => {
                get().updateAchievementProgress('correct_answers', 1)
                get().addXP(10, 'correct answer')
            },

            // Daily streak tracking
            onDailyStreakUpdate: (streakCount) => {
                get().updateAchievementProgress('daily_streak', streakCount)

                // Bonus XP for streaks
                if (streakCount > 1) {
                    get().addXP(streakCount * 5, 'daily streak bonus')
                }
            },

            // Clear new achievements (after showing notification)
            clearNewAchievements: () => set({ newAchievements: [] }),

            // Get achievement by ID
            getAchievement: (id) => {
                const state = get()
                return state.achievements.find(achievement => achievement.id === id)
            },

            // Get unlocked achievements
            getUnlockedAchievements: () => {
                const state = get()
                return state.achievements.filter(achievement =>
                    state.unlockedAchievements.includes(achievement.id)
                )
            },

            // Get available (locked) achievements
            getAvailableAchievements: () => {
                const state = get()
                return state.achievements.filter(achievement =>
                    !state.unlockedAchievements.includes(achievement.id)
                )
            },

            // Get achievement progress percentage
            getAchievementProgress: (achievement) => {
                const state = get()
                const currentProgress = state.achievementProgress[achievement.type] || 0
                return Math.min(100, (currentProgress / achievement.target) * 100)
            },

            // Reset all data (for sign out)
            reset: () => set({
                totalXP: 0,
                weeklyXP: 0,
                level: 1,
                lastXPDate: null,
                unlockedAchievements: [],
                achievementProgress: {},
                newAchievements: []
            }),

            // Firebase data persistence
            saveToFirebase: async (userId) => {
                if (!userId) return

                try {
                    const state = get()
                    const achievementData = {
                        totalXP: state.totalXP,
                        weeklyXP: state.weeklyXP,
                        level: state.level,
                        lastXPDate: state.lastXPDate,
                        unlockedAchievements: state.unlockedAchievements,
                        achievementProgress: state.achievementProgress,
                        updatedAt: new Date()
                    }

                    await setDoc(doc(db, 'userAchievements', userId), achievementData)
                    console.log('Achievement data saved to Firebase')
                } catch (error) {
                    console.error('Error saving achievement data to Firebase:', error)
                }
            },

            loadFromFirebase: async (userId) => {
                if (!userId) return

                try {
                    const docRef = doc(db, 'userAchievements', userId)
                    const docSnap = await getDoc(docRef)

                    if (docSnap.exists()) {
                        const data = docSnap.data()
                        set({
                            totalXP: data.totalXP || 0,
                            weeklyXP: data.weeklyXP || 0,
                            level: data.level || 1,
                            lastXPDate: data.lastXPDate || null,
                            unlockedAchievements: data.unlockedAchievements || [],
                            achievementProgress: data.achievementProgress || {}
                        })
                        console.log('Achievement data loaded from Firebase')
                        return data
                    } else {
                        console.log('No achievement data found in Firebase')
                        return null
                    }
                } catch (error) {
                    console.error('Error loading achievement data from Firebase:', error)
                    return null
                }
            },

            clearFirebaseData: async (userId) => {
                if (!userId) return

                try {
                    await setDoc(doc(db, 'userAchievements', userId), {
                        totalXP: 0,
                        weeklyXP: 0,
                        level: 1,
                        lastXPDate: null,
                        unlockedAchievements: [],
                        achievementProgress: {},
                        updatedAt: new Date()
                    })
                    console.log('Achievement data cleared from Firebase')
                } catch (error) {
                    console.error('Error clearing achievement data from Firebase:', error)
                }
            }
        }),
        {
            name: 'achievement-storage',
            partialize: (state) => ({
                totalXP: state.totalXP,
                weeklyXP: state.weeklyXP,
                level: state.level,
                lastXPDate: state.lastXPDate,
                unlockedAchievements: state.unlockedAchievements,
                achievementProgress: state.achievementProgress
            })
        }
    )
)

export default useAchievementStore 