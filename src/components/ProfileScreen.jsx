import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, buttonVariants } from '../animations/transitions'
import useOnboardingStore from '../store/onboardingStore'
import useLessonStore from '../store/lessonStore'
import useAchievementStore from '../store/achievementStore'
import useNavigationStore from '../store/navigationStore'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'

const ProfileScreen = () => {
    const { user, formData, signOut: signOutStore } = useOnboardingStore()
    const {
        completedLessons,
        points,
        streaks,
        reset: resetLessons,
        clearFirebaseData: clearLessonData
    } = useLessonStore()
    const {
        reset: resetAchievements,
        clearFirebaseData: clearAchievementData
    } = useAchievementStore()
    const {
        reset: resetNavigation,
        clearFirebaseData: clearNavigationData
    } = useNavigationStore()

    const handleSignOut = async () => {
        try {
            const userId = user?.uid

            // Clear Firebase data first
            if (userId) {
                await Promise.all([
                    clearLessonData(userId),
                    clearAchievementData(userId),
                    clearNavigationData(userId)
                ])
                console.log('All Firebase data cleared')
            }

            await signOut(auth)

            // Reset all stores to clear local data
            signOutStore()
            resetLessons()
            resetAchievements()
            resetNavigation()

            // Clear global references
            if (typeof window !== 'undefined') {
                window.achievementStore = null
                window.currentUserId = null
            }

            console.log('User signed out and all data cleared (local + Firebase)')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    const profileStats = [
        {
            label: 'Lessons Completed',
            value: completedLessons.length,
            icon: '📚',
            color: 'text-blue-600'
        },
        {
            label: 'Points Earned',
            value: points,
            icon: '⭐',
            color: 'text-yellow-600'
        },
        {
            label: 'Current Streak',
            value: streaks.current,
            icon: '🔥',
            color: 'text-orange-600'
        }
    ]

    const profileSections = [
        {
            title: 'Account',
            items: [
                {
                    label: 'Email',
                    value: user?.email || 'Not set',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    )
                },
                {
                    label: 'Name',
                    value: formData?.name || 'Not set',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    )
                }
            ]
        },
        {
            title: 'Learning Preferences',
            items: [
                {
                    label: 'Sign Language Level',
                    value: formData?.signLanguageLevel || 'Not set',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    )
                },
                {
                    label: 'Daily Practice Goal',
                    value: formData?.hoursPerDay || 'Not set',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )
                }
            ]
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-white pb-20"
        >
            {/* Header */}
            <div className="px-4 pt-8 pb-6 md:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl">👤</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {formData?.name || 'User Profile'}
                    </h1>
                    <p className="text-gray-600">
                        Manage your account and learning preferences
                    </p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="px-4 md:px-6 lg:px-8 mb-8">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-3 gap-4"
                >
                    {profileStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={staggerItem}
                            className="bg-gray-50 rounded-xl p-4 text-center"
                        >
                            <div className={`text-2xl mb-2 ${stat.color}`}>{stat.icon}</div>
                            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                            <div className="text-xs text-gray-600">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Profile Sections */}
            <div className="px-4 md:px-6 lg:px-8 space-y-6">
                {profileSections.map((section) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                    >
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-900">{section.title}</h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {section.items.map((item, index) => (
                                <div key={item.label} className="px-4 py-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-gray-400">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{item.label}</h4>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-600 capitalize">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="px-4 md:px-6 lg:px-8 mt-8 space-y-4">
                {/* Settings Button */}
                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                </motion.button>

                {/* Help & Support Button */}
                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Help & Support</span>
                </motion.button>

                {/* Sign Out Button */}
                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleSignOut}
                    className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-medium py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                </motion.button>
            </div>
        </motion.div>
    )
}

export default ProfileScreen 