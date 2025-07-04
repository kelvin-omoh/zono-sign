import { motion } from 'framer-motion'
import { pageVariants, buttonVariants } from '../animations/transitions'
import useOnboardingStore from '../store/onboardingStore'

const StartLessons = ({ formData }) => {
    const { completeOnboarding, isLoading } = useOnboardingStore()

    const handleStartLessons = async () => {
        console.log('Starting lessons with data:', formData)
        const success = await completeOnboarding()
        if (success) {
            console.log('Onboarding completed successfully!')
        }
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            className="min-h-screen flex flex-col justify-center items-center p-6 lg:p-12 max-w-4xl mx-auto w-full text-center"
        >
            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:flex-row lg:items-center justify-center gap-8 lg:gap-16">
                {/* Illustration */}
                <div className="lg:flex-1 flex justify-center">
                    <motion.div
                        className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex items-center justify-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="relative">
                            <img src="./start.png" alt="Start lessons illustration" />
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <motion.div
                    className="lg:flex-1 lg:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-6">
                        Start your lessons!
                    </h1>

                    <p className="text-gray-600 mb-8 lg:mb-12 text-base md:text-lg lg:text-xl max-w-md mx-auto lg:mx-0">
                        Amazing! You're about to discover an engaging way to learn a new type of learning
                    </p>

                    {/* Start Button */}
                    <div className="max-w-md mx-auto lg:mx-0 w-full lg:max-w-lg">
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={handleStartLessons}
                            disabled={isLoading}
                            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-semibold py-4 px-6 rounded-xl lg:rounded-2xl transition-colors duration-200 text-lg lg:text-xl shadow-lg hover:shadow-xl flex items-center justify-center"
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"
                                />
                            ) : null}
                            {isLoading ? 'Starting...' : 'Next'}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default StartLessons 