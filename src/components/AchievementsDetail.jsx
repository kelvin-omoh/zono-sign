import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, buttonVariants } from '../animations/transitions'
import useAchievementStore from '../store/achievementStore'
import useNavigationStore from '../store/navigationStore'

const AchievementsDetail = () => {
    const {
        achievements,
        unlockedAchievements,
        getAchievementProgress,
        achievementProgress
    } = useAchievementStore()
    const { setCurrentTab } = useNavigationStore()

    const handleBackToProgress = () => {
        setCurrentTab('progress')
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-white pb-20"
        >
            {/* Header */}
            <div className="px-4 pt-8 pb-6 md:px-6 lg:px-8">
                <div className="flex items-center mb-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBackToProgress}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                        Available Achievements
                    </h1>
                </div>
            </div>

            {/* Achievements List */}
            <div className="px-4 md:px-6 lg:px-8">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                >
                    {achievements.map((achievement) => {
                        const isUnlocked = unlockedAchievements.includes(achievement.id)
                        const progress = getAchievementProgress(achievement)
                        const currentProgress = achievementProgress[achievement.type] || 0

                        return (
                            <motion.div
                                key={achievement.id}
                                variants={staggerItem}
                                className={`p-4 rounded-2xl border-2 transition-all duration-200 ${isUnlocked
                                        ? achievement.color
                                        : 'bg-gray-50 border-gray-200'
                                    }`}
                            >
                                <div className="flex items-center space-x-4">
                                    {/* Achievement Icon */}
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${isUnlocked
                                            ? 'bg-white shadow-sm'
                                            : 'bg-gray-200'
                                        }`}>
                                        {isUnlocked ? achievement.icon : '🔒'}
                                    </div>

                                    {/* Achievement Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-semibold mb-1 text-sm md:text-base ${isUnlocked ? 'text-gray-900' : 'text-gray-500'
                                            }`}>
                                            {achievement.title}
                                        </h3>
                                        <p className={`text-xs md:text-sm ${isUnlocked ? 'text-gray-600' : 'text-gray-400'
                                            }`}>
                                            {achievement.description}
                                        </p>

                                        {/* Progress Bar for Unlocked/In-Progress Achievements */}
                                        {!isUnlocked && progress > 0 && (
                                            <div className="mt-2">
                                                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                                    <span>Progress</span>
                                                    <span>{currentProgress}/{achievement.target}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* XP Reward */}
                                        <div className="flex items-center mt-2">
                                            <span className="text-xs text-yellow-600 font-medium">
                                                +{achievement.xpReward} XP
                                            </span>
                                            {isUnlocked && (
                                                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                    Completed
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Completion Check */}
                                    {isUnlocked && (
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>

            {/* Summary Stats */}
            <div className="px-4 md:px-6 lg:px-8 mt-8">
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 border border-teal-100">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Achievement Progress</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-2xl font-bold text-teal-600">
                                    {unlockedAchievements.length}
                                </div>
                                <div className="text-sm text-gray-600">Unlocked</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-600">
                                    {achievements.length - unlockedAchievements.length}
                                </div>
                                <div className="text-sm text-gray-600">Remaining</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default AchievementsDetail 