import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, buttonVariants } from '../animations/transitions'
import useLessonStore from '../store/lessonStore'
import useOnboardingStore from '../store/onboardingStore'
import useAchievementStore from '../store/achievementStore'
import useNavigationStore from '../store/navigationStore'

const ProgressScreen = () => {
    const { completedLessons, points, streaks } = useLessonStore()
    const { formData } = useOnboardingStore()
    const {
        weeklyXP,
        totalXP,
        level,
        getUnlockedAchievements,
        getAvailableAchievements,
        achievements
    } = useAchievementStore()
    const { setCurrentTab } = useNavigationStore()

    // Initialize achievement store reference for lesson integration
    if (typeof window !== 'undefined') {
        window.achievementStore = useAchievementStore.getState()
    }

    const unlockedAchievements = getUnlockedAchievements()
    const availableAchievements = getAvailableAchievements()

    // Calculate challenges (quizzes answered correctly)
    const challenges = Math.floor(points / 2) // Rough estimate

    const progressStats = [
        {
            id: 'challenges',
            title: 'Challenges',
            value: challenges,
            icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            color: 'bg-white border-gray-200'
        },
        {
            id: 'lessons',
            title: 'Completed lessons',
            value: completedLessons.length,
            icon: (
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            color: 'bg-white border-gray-200'
        },
        {
            id: 'points',
            title: 'Total points earned',
            value: points,
            icon: (
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
            ),
            color: 'bg-white border-gray-200'
        },
        {
            id: 'streaks',
            title: 'Daily streaks',
            value: streaks.current,
            icon: (
                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
            ),
            color: 'bg-white border-gray-200'
        }
    ]

    const handleViewAllAchievements = () => {
        setCurrentTab('achievements')
    }

    // Calculate weekly XP progress (assuming 100 XP goal per week)
    const weeklyXPGoal = 100
    const weeklyProgress = Math.min((weeklyXP / weeklyXPGoal) * 100, 100)

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
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                    Track Your Progress
                </h1>

                {/* Weekly XP Progress */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-900 font-medium">Your XP this week</span>
                        <span className="text-gray-900 font-bold">{weeklyXP}XP</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${weeklyProgress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="px-4 md:px-6 lg:px-8 mb-8">
                <h3 className="text-gray-900 font-medium mb-4">Your statistics</h3>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 gap-4"
                >
                    {progressStats.map((stat) => (
                        <motion.div
                            key={stat.id}
                            variants={staggerItem}
                            className={`${stat.color} rounded-2xl p-4 border`}
                        >
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-2">
                                    {stat.icon}
                                    <span className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </span>
                                </div>
                                <span className="text-gray-600 text-sm">
                                    {stat.title}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Achievements Section */}
            <div className="px-4 md:px-6 lg:px-8 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900 font-medium">Your achievements</h3>
                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={handleViewAllAchievements}
                        className="flex items-center text-gray-500"
                    >
                        <span className="text-sm">{achievements.length} achievements available</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </div>

                {/* Achievement Cards */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="space-y-3"
                >
                    {unlockedAchievements.slice(0, 3).map((achievement) => (
                        <motion.div
                            key={achievement.id}
                            variants={staggerItem}
                            className={`p-4 rounded-2xl border ${achievement.color}`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">
                                    {achievement.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 text-sm">
                                        {achievement.title}
                                    </h4>
                                    <p className="text-gray-600 text-xs">
                                        {achievement.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Show placeholder if no achievements unlocked */}
                    {unlockedAchievements.length === 0 && (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-3">🏆</div>
                            <h4 className="font-semibold text-gray-900 mb-2">No achievements yet</h4>
                            <p className="text-gray-600 text-sm">
                                Complete lessons and answer questions to unlock achievements!
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    )
}

export default ProgressScreen 