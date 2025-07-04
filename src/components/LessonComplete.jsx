import { motion } from 'framer-motion'
import { successVariants, buttonVariants } from '../animations/transitions'
import useLessonStore from '../store/lessonStore'
import useNavigationStore from '../store/navigationStore'

const LessonComplete = () => {
    const { returnToDashboard, points, streaks } = useLessonStore()
    const { setCurrentTab } = useNavigationStore()

    const handleNextLesson = () => {
        setCurrentTab('overview') // Reset to overview tab when going back
        returnToDashboard()
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white flex flex-col"
        >
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8">
                {/* Success Illustration */}
                <motion.div
                    variants={successVariants}
                    initial="initial"
                    animate="animate"
                    className="mb-8"
                >
                    <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 relative">
                        {/* Success Character */}
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative overflow-hidden">
                            {/* Character Avatar */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                className="relative z-10"
                            >
                                <img
                                    src="/c6597b38da30748f49dc502c4a094800eef1d645.jpg"
                                    alt="Success Character"
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
                                />
                            </motion.div>

                            {/* Decorative Elements */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 border-4 border-dashed border-purple-200 rounded-full"
                            />

                            {/* Floating Stars */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [0, -20, 0],
                                        rotate: [0, 180, 360]
                                    }}
                                    transition={{
                                        duration: 2 + i * 0.5,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                    className="absolute w-6 h-6 text-yellow-400"
                                    style={{
                                        top: `${20 + i * 10}%`,
                                        left: `${10 + i * 15}%`
                                    }}
                                >
                                    ⭐
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        You completed your
                        <br />
                        first lesson!
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto">
                        Congratulations on taking the first step in your sign language journey!
                    </p>
                </motion.div>

                {/* Achievement Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gray-50 rounded-2xl p-6 mb-8 w-full max-w-sm"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-teal-600 mb-1">
                                {points}
                            </div>
                            <div className="text-sm text-gray-600">Points earned</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600 mb-1">
                                {streaks.current}
                            </div>
                            <div className="text-sm text-gray-600">Streak</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Action */}
            <div className="px-4 md:px-6 lg:px-8 pb-8">
                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    onClick={handleNextLesson}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200"
                >
                    Next lesson
                </motion.button>
            </div>
        </motion.div>
    )
}

export default LessonComplete 