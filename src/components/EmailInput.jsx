import { useState } from 'react'
import { motion } from 'framer-motion'
import useOnboardingStore from '../store/onboardingStore'
import { buttonVariants, fieldVariants, errorVariants } from '../animations/transitions'

const EmailInput = ({ onNext }) => {
    const { formData, updateFormData, user } = useOnboardingStore()
    const [email, setEmail] = useState(formData.email || user?.email || '')
    const [isValid, setIsValid] = useState(true)

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        updateFormData('email', value)
        setIsValid(validateEmail(value) || value === '')
    }

    const handleNext = () => {
        if (email && validateEmail(email)) {
            onNext()
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 p-6 lg:p-12 pt-24 lg:pt-12 max-w-2xl mx-auto w-full"
            >
                <div className="text-center lg:text-left mb-8 lg:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6"
                    >
                        Confirm Your Email
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 text-base md:text-lg lg:text-xl"
                    >
                        We'll use this to send you learning updates and progress reports
                    </motion.p>
                </div>

                {/* Email Input */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8 lg:mb-12"
                >
                    <label htmlFor="email" className="block text-sm lg:text-base font-medium text-gray-700 mb-3 lg:mb-4">
                        Email Address
                    </label>
                    <motion.input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email address"
                        variants={fieldVariants}
                        whileFocus="focus"
                        onBlur={() => setIsValid(validateEmail(email) || email === '')}
                        className={`w-full p-4 lg:p-6 border-2 rounded-xl lg:rounded-2xl focus:outline-none transition-colors duration-200 text-base lg:text-lg ${!isValid
                                ? 'border-red-500 focus:border-red-500'
                                : email
                                    ? 'border-teal-500 focus:border-teal-500'
                                    : 'border-gray-200 focus:border-teal-500'
                            }`}
                    />
                    {!isValid && (
                        <motion.p
                            variants={errorVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="text-red-500 text-sm lg:text-base mt-2"
                        >
                            Please enter a valid email address
                        </motion.p>
                    )}
                    {user?.email && email === user.email && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-teal-600 text-sm lg:text-base mt-2 flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Using your account email
                        </motion.p>
                    )}
                </motion.div>

                {/* Next Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-md mx-auto w-full lg:max-w-lg"
                >
                    <motion.button
                        variants={buttonVariants}
                        whileHover={email && isValid ? "hover" : undefined}
                        whileTap={email && isValid ? "tap" : undefined}
                        onClick={handleNext}
                        disabled={!email || !isValid}
                        className={`w-full py-4 px-6 rounded-xl lg:rounded-2xl font-semibold text-lg lg:text-xl transition-all duration-200 ${email && isValid
                                ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Continue
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default EmailInput 