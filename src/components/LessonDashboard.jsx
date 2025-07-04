import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, buttonVariants } from '../animations/transitions'
import useLessonStore from '../store/lessonStore'
import useAchievementStore from '../store/achievementStore'
import { useState, useEffect } from 'react'

const LessonDashboard = () => {
    const { startQuiz, completedLessons, points, streaks, initializeQuizzes } = useLessonStore()
    const { weeklyXP } = useAchievementStore()
    const [activeTab, setActiveTab] = useState('sign-language')

    // Initialize sign language quizzes on component mount
    useEffect(() => {
        initializeQuizzes()
    }, [initializeQuizzes])

    // Initialize achievement store reference for lesson integration
    if (typeof window !== 'undefined') {
        window.achievementStore = useAchievementStore.getState()
    }

    // Sign Language lesson progression
    const signLanguageLessons = [
        {
            id: 'common',
            title: 'Common hand signs',
            subtitle: 'Learn basic hand signs',
            image: '/home.png',
            lessonNumber: 1,
            unlocked: true
        },
        {
            id: 'advanced',
            title: 'Advanced hand signs',
            subtitle: 'More complex gestures',
            image: '/home.png',
            lessonNumber: 2,
            unlocked: completedLessons.includes('common')
        },
        {
            id: 'sonic',
            title: 'Sonic hand signs',
            subtitle: 'Musical sign language',
            image: '/home.png',
            lessonNumber: 3,
            unlocked: completedLessons.includes('advanced')
        },
        {
            id: 'names',
            title: 'Names with hand signs',
            subtitle: 'Spelling with signs',
            image: '/home.png',
            lessonNumber: 4,
            unlocked: completedLessons.includes('sonic')
        }
    ]

    // Check if sign language section is completed
    const signLanguageCompleted = completedLessons.length >= 4

    const handleStartLesson = (lessonId) => {
        startQuiz(lessonId)
    }

    const handleTabChange = (tab) => {
        if (tab === 'lip-reading' && !signLanguageCompleted) {
            return // Don't allow switching to locked tab
        }
        setActiveTab(tab)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="px-4 pt-8 pb-6 md:px-6 lg:px-8">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                    Start lessons with Zero Zone!
                </h1>

                {/* Learning Type Tabs */}
                <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-xl">
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTabChange('sign-language')}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${activeTab === 'sign-language'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600'
                            }`}
                    >
                        Sign Language
                    </motion.button>
                    <motion.button
                        whileTap={signLanguageCompleted ? { scale: 0.98 } : {}}
                        onClick={() => handleTabChange('lip-reading')}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 relative ${activeTab === 'lip-reading'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : signLanguageCompleted
                                ? 'text-gray-600 hover:text-gray-800'
                                : 'text-gray-400 cursor-not-allowed'
                            }`}
                        disabled={!signLanguageCompleted}
                    >
                        Lip Reading
                        {!signLanguageCompleted && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </motion.button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                        <div className="w-10 h-10 mx-auto mb-2 bg-orange-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">Daily streaks</p>
                        <p className="text-lg font-bold">{streaks.current}</p>
                    </div>
                    <div className="text-center">
                        <div className="w-10 h-10 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-lg">⭐</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">Points earned</p>
                        <p className="text-lg font-bold">{points}</p>
                    </div>
                    <div className="text-center">
                        <div className="w-10 h-10 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">Lessons completed</p>
                        <p className="text-lg font-bold">{completedLessons.length}</p>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="px-4 md:px-6 lg:px-8">
                {activeTab === 'sign-language' ? (
                    <motion.div
                        key="sign-language"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Current/Next Lesson */}
                        {signLanguageLessons.map((lesson) => {
                            const isCompleted = completedLessons.includes(lesson.id)
                            const isCurrent = lesson.unlocked && !isCompleted
                            const isLocked = !lesson.unlocked

                            // Show current lesson or first incomplete lesson
                            if (!isCurrent && !isLocked) return null
                            if (isLocked && lesson.lessonNumber > (completedLessons.length + 1)) return null

                            return (
                                <motion.div
                                    key={lesson.id}
                                    variants={staggerItem}
                                    className="mb-6"
                                >
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            {/* Lesson Illustration */}
                                            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-200">
                                                <img
                                                    src={lesson.image}
                                                    alt={lesson.title}
                                                    className="w-12 h-12 object-contain"
                                                />
                                            </div>

                                            {/* Lesson Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="text-sm font-medium text-gray-500">
                                                        Lesson {lesson.lessonNumber}
                                                    </span>
                                                    {isCompleted && (
                                                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                    {isLocked && (
                                                        <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                                                            <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <h3 className="font-semibold text-gray-900 mb-1">
                                                    {lesson.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {lesson.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="mt-4 flex justify-end">
                                            {isCurrent && (
                                                <motion.button
                                                    variants={buttonVariants}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                    onClick={() => handleStartLesson(lesson.id)}
                                                    className="px-6 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200"
                                                >
                                                    Continue
                                                </motion.button>
                                            )}
                                            {isCompleted && (
                                                <motion.button
                                                    variants={buttonVariants}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                    onClick={() => handleStartLesson(lesson.id)}
                                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors duration-200"
                                                >
                                                    Review
                                                </motion.button>
                                            )}
                                            {isLocked && (
                                                <div className="px-6 py-2 bg-gray-100 text-gray-400 rounded-xl font-medium cursor-not-allowed">
                                                    Locked
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}

                        {/* Progress Overview */}
                        <div className="mt-6">
                            <h3 className="font-medium text-gray-900 mb-4">Your Progress</h3>
                            <div className="space-y-3">
                                {signLanguageLessons.map((lesson) => {
                                    const isCompleted = completedLessons.includes(lesson.id)
                                    const isUnlocked = lesson.unlocked

                                    return (
                                        <div key={lesson.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${isCompleted
                                                ? 'bg-green-500 text-white'
                                                : isUnlocked
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'bg-gray-300 text-gray-600'
                                                }`}>
                                                {isCompleted ? '✓' : lesson.lessonNumber}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`font-medium text-sm ${isUnlocked ? 'text-gray-900' : 'text-gray-500'
                                                    }`}>
                                                    {lesson.title}
                                                </h4>
                                            </div>
                                            {!isUnlocked && (
                                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="lip-reading"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center py-12"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Lip Reading Lessons
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Learn to read lips and understand spoken words through visual cues.
                        </p>
                        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                            <p className="text-sm text-purple-700">
                                Coming soon! Complete all Sign Language lessons to unlock this section.
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Bottom padding for fixed navigation */}
            <div className="h-20"></div>
        </div>
    )
}

export default LessonDashboard 