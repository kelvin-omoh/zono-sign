import { motion, AnimatePresence } from 'framer-motion'
import useOnboardingStore from '../store/onboardingStore'
import { pageVariants, progressVariants } from '../animations/transitions'
import SignLanguageQuestion from './SignLanguageQuestion'
import HoursPerDayQuestion from './HoursPerDayQuestion'
import EmailInput from './EmailInput'
import NameInput from './NameInput'
import StartLessons from './StartLessons'

const OnboardingFlow = () => {
    const {
        currentStep,
        nextStep,
        prevStep,
        formData,
        updateFormData,
        isLoading,
        error,
        clearError
    } = useOnboardingStore()

    const steps = [
        SignLanguageQuestion,
        HoursPerDayQuestion,
        EmailInput,
        NameInput,
        StartLessons
    ]

    const CurrentStepComponent = steps[currentStep]
    const progress = currentStep >= 0 && currentStep < steps.length - 1
        ? ((currentStep + 1) / (steps.length - 1)) * 100
        : 0

    return (
        <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
            {/* Progress Bar */}
            <AnimatePresence>
                {currentStep >= 0 && currentStep < steps.length - 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-0 left-0 right-0 z-50 bg-white px-4 pt-4 pb-2"
                    >
                        <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-1 overflow-hidden">
                            <motion.div
                                className="bg-teal-500 h-1 rounded-full"
                                variants={progressVariants}
                                initial="initial"
                                animate="animate"
                                custom={progress}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back Button */}
            <AnimatePresence>
                {currentStep > 0 && currentStep < steps.length - 1 && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onClick={prevStep}
                        className="fixed top-6 left-4 z-50 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Error Display */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-20 left-4 right-4 z-50 bg-red-500 text-white p-4 rounded-lg shadow-lg"
                    >
                        <div className="flex justify-between items-center">
                            <span>{error}</span>
                            <button
                                onClick={clearError}
                                className="ml-4 text-white hover:text-red-200"
                            >
                                ×
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content with Page Transitions */}
            <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        variants={pageVariants}
                        initial="initial"
                        animate="in"
                        exit="out"
                        className="absolute inset-0"
                    >
                        <CurrentStepComponent
                            onNext={nextStep}
                            onPrev={prevStep}
                            formData={formData}
                            updateFormData={updateFormData}
                            currentStep={currentStep}
                            isLoading={isLoading}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Loading Overlay */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default OnboardingFlow 