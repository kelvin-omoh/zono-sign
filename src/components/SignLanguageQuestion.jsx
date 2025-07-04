import { motion } from 'framer-motion'
import useOnboardingStore from '../store/onboardingStore'
import { staggerContainer, staggerItem, buttonVariants, radioVariants } from '../animations/transitions'

const SignLanguageQuestion = ({ onNext }) => {
    const { formData, updateFormData } = useOnboardingStore()
    const selectedOption = formData.signLanguageLevel

    const options = [
        'Zero experience',
        'I understand few sign language',
        'Very good at sign language'
    ]

    const handleOptionSelect = (option) => {
        updateFormData('signLanguageLevel', option)
    }

    const handleNext = () => {
        if (selectedOption) {
            onNext()
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center p-6 lg:p-12 pt-24 lg:pt-12 max-w-2xl mx-auto w-full">
            {/* Question */}
            <div className="flex-1 flex flex-col justify-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-8 lg:mb-12 leading-tight text-center lg:text-left"
                >
                    How familiar are you with sign language?
                </motion.h2>

                {/* Options */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="space-y-4 lg:space-y-6 mb-8 lg:mb-12"
                >
                    {options.map((option, index) => (
                        <motion.button
                            key={index}
                            variants={staggerItem}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => handleOptionSelect(option)}
                            className={`w-full p-4 lg:p-6 text-left rounded-xl lg:rounded-2xl border-2 transition-all duration-200 ${selectedOption === option
                                    ? 'border-teal-500 bg-teal-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-gray-900 font-medium text-base lg:text-lg">{option}</span>
                                <motion.div
                                    className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 flex items-center justify-center ${selectedOption === option
                                            ? 'border-teal-500 bg-teal-500'
                                            : 'border-gray-300'
                                        }`}
                                    animate={selectedOption === option ? "selected" : "unselected"}
                                    variants={radioVariants}
                                >
                                    {selectedOption === option && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-2 h-2 lg:w-3 lg:h-3 bg-white rounded-full"
                                        />
                                    )}
                                </motion.div>
                            </div>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Next Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="max-w-md mx-auto w-full lg:max-w-lg"
                >
                    <motion.button
                        variants={buttonVariants}
                        whileHover={selectedOption ? "hover" : undefined}
                        whileTap={selectedOption ? "tap" : undefined}
                        onClick={handleNext}
                        disabled={!selectedOption}
                        className={`w-full py-4 px-6 rounded-xl lg:rounded-2xl font-semibold text-lg lg:text-xl transition-all duration-200 ${selectedOption
                                ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Next
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}

export default SignLanguageQuestion 