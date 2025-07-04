import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import useAchievementStore from '../store/achievementStore'

const AchievementNotification = () => {
    const { newAchievements, clearNewAchievements, getAchievement } = useAchievementStore()
    const [currentNotification, setCurrentNotification] = useState(null)
    const [notificationQueue, setNotificationQueue] = useState([])

    useEffect(() => {
        if (newAchievements.length > 0 && !currentNotification) {
            // Add new achievements to queue
            const newNotifications = newAchievements.map(id => getAchievement(id))
            setNotificationQueue(prev => [...prev, ...newNotifications])
            clearNewAchievements()
        }
    }, [newAchievements, currentNotification, getAchievement, clearNewAchievements])

    useEffect(() => {
        if (notificationQueue.length > 0 && !currentNotification) {
            // Show next notification from queue
            const nextNotification = notificationQueue[0]
            setCurrentNotification(nextNotification)
            setNotificationQueue(prev => prev.slice(1))

            // Auto-hide after 4 seconds
            setTimeout(() => {
                setCurrentNotification(null)
            }, 4000)
        }
    }, [notificationQueue, currentNotification])

    const handleDismiss = () => {
        setCurrentNotification(null)
    }

    return (
        <AnimatePresence>
            {currentNotification && (
                <motion.div
                    initial={{ opacity: 0, y: -100, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -100, scale: 0.9 }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                        duration: 0.5
                    }}
                    className="fixed top-4 left-4 right-4 z-50 pointer-events-auto"
                >
                    <div className={`
                        p-4 rounded-2xl border-2 shadow-lg backdrop-blur-sm
                        ${currentNotification.color}
                    `}>
                        <div className="flex items-center space-x-3">
                            {/* Achievement Icon */}
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                                {currentNotification.icon}
                            </div>

                            {/* Achievement Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-xs font-bold text-yellow-600 uppercase tracking-wide">
                                        🎉 Achievement Unlocked!
                                    </span>
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                    {currentNotification.title}
                                </h4>
                                <p className="text-gray-600 text-xs">
                                    {currentNotification.description}
                                </p>
                                <div className="flex items-center mt-2 space-x-2">
                                    <span className="text-xs text-yellow-600 font-medium">
                                        +{currentNotification.xpReward} XP
                                    </span>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                        Completed
                                    </span>
                                </div>
                            </div>

                            {/* Dismiss Button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleDismiss}
                                className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center flex-shrink-0"
                            >
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>

                    {/* Animated Background Sparkles */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    x: [0, Math.random() * 100 - 50],
                                    y: [0, Math.random() * 100 - 50]
                                }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                    repeatDelay: 2
                                }}
                                className="absolute top-4 left-4 text-yellow-400 text-xs"
                            >
                                ✨
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AchievementNotification 