import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useOnboardingStore from '../store/onboardingStore'
import { pageVariants, buttonVariants, fieldVariants, errorVariants } from '../animations/transitions'

const AuthFlow = ({ onAuthSuccess, initialMode = 'signup', onBack }) => {
    const [mode, setMode] = useState(initialMode) // 'signup' or 'signin'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    })
    const [errors, setErrors] = useState({})
    const { signUp, signIn, isLoading, error: storeError, updateFormData } = useOnboardingStore()

    const validateForm = () => {
        const newErrors = {}

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        // Confirm password for signup
        if (mode === 'signup') {
            if (!formData.name) {
                newErrors.name = 'Name is required'
            }
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password'
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Clear specific field error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            if (mode === 'signup') {
                await signUp(formData.email, formData.password)
                updateFormData('name', formData.name)
                updateFormData('email', formData.email)
            } else {
                await signIn(formData.email, formData.password)
            }
            onAuthSuccess?.()
        } catch (error) {
            console.error('Authentication error:', error)
        }
    }

    const toggleMode = () => {
        setMode(mode === 'signup' ? 'signin' : 'signup')
        setErrors({})
        setFormData({
            email: formData.email, // Keep email when switching
            password: '',
            confirmPassword: '',
            name: ''
        })
    }

    const displayError = storeError || errors.general

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Side Image - Desktop Only */}
            <div className="hidden lg:flex lg:w-1/4 xl:w-1/3 bg-gradient-to-br from-teal-500 to-teal-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 xl:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="w-24 h-24 xl:w-32 xl:h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6 xl:mb-8 mx-auto">
                            <svg className="w-12 h-12 xl:w-16 xl:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl xl:text-3xl font-bold mb-3 xl:mb-4">Learn Sign Language</h2>
                        <p className="text-lg xl:text-xl text-teal-100 leading-relaxed mb-6 xl:mb-8">
                            Join thousands of learners mastering sign language with personalized, step-by-step lessons designed for your success.
                        </p>

                        {/* Features List */}
                        <div className="space-y-3 xl:space-y-4 text-left">
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-teal-100">Personalized learning pace</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-teal-100">Interactive lessons and practice</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-teal-100">Progress tracking and achievements</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-48 h-48 xl:w-64 xl:h-64 bg-white bg-opacity-10 rounded-full -translate-y-24 xl:-translate-y-32 translate-x-24 xl:translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-36 h-36 xl:w-48 xl:h-48 bg-white bg-opacity-10 rounded-full translate-y-18 xl:translate-y-24 -translate-x-18 xl:-translate-x-24"></div>
            </div>

            {/* Center Form Section - Now Much Wider */}
            <div className="flex-1 lg:w-1/2 xl:w-1/3 flex flex-col justify-center p-8 lg:p-12 xl:p-16">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onBack}
                    className="absolute top-6 left-6 lg:relative lg:top-0 lg:left-0 lg:mb-8 xl:mb-12 p-2 hover:bg-gray-100 rounded-full transition-colors w-fit"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </motion.button>

                <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                    className="w-full max-w-lg xl:max-w-xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10 xl:mb-12"
                    >
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 xl:mb-6">
                            {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
                        </h1>
                        <p className="text-gray-600 text-base lg:text-lg xl:text-xl leading-relaxed">
                            {mode === 'signup'
                                ? 'Start your sign language learning journey today and join our community'
                                : 'Continue your learning journey and reach your goals'
                            }
                        </p>
                    </motion.div>

                    {/* Error Display */}
                    <AnimatePresence>
                        {displayError && (
                            <motion.div
                                variants={errorVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="mb-8 p-4 xl:p-5 bg-red-50 border border-red-200 rounded-xl"
                            >
                                <p className="text-red-600 text-sm xl:text-base">{displayError}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Auth Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6 xl:space-y-8"
                    >
                        {/* Name Field (Signup Only) */}
                        <AnimatePresence>
                            {mode === 'signup' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2 xl:space-y-3"
                                >
                                    <label className="block text-sm xl:text-base font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="Enter your full name"
                                        className={`w-full p-4 xl:p-5 border-2 rounded-xl focus:outline-none transition-colors text-base xl:text-lg ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-teal-500'
                                            }`}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm xl:text-base mt-2">{errors.name}</p>}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email Field */}
                        <div className="space-y-2 xl:space-y-3">
                            <label className="block text-sm xl:text-base font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Enter your email"
                                className={`w-full p-4 xl:p-5 border-2 rounded-xl focus:outline-none transition-colors text-base xl:text-lg ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-teal-500'
                                    }`}
                            />
                            {errors.email && <p className="text-red-500 text-sm xl:text-base mt-2">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2 xl:space-y-3">
                            <label className="block text-sm xl:text-base font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                placeholder="Enter your password"
                                className={`w-full p-4 xl:p-5 border-2 rounded-xl focus:outline-none transition-colors text-base xl:text-lg ${errors.password ? 'border-red-500' : 'border-gray-200 focus:border-teal-500'
                                    }`}
                            />
                            {errors.password && <p className="text-red-500 text-sm xl:text-base mt-2">{errors.password}</p>}
                        </div>

                        {/* Confirm Password Field (Signup Only) */}
                        <AnimatePresence>
                            {mode === 'signup' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2 xl:space-y-3"
                                >
                                    <label className="block text-sm xl:text-base font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        placeholder="Confirm your password"
                                        className={`w-full p-4 xl:p-5 border-2 rounded-xl focus:outline-none transition-colors text-base xl:text-lg ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200 focus:border-teal-500'
                                            }`}
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-sm xl:text-base mt-2">{errors.confirmPassword}</p>}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            variants={buttonVariants}
                            whileHover={!isLoading ? "hover" : undefined}
                            whileTap={!isLoading ? "tap" : undefined}
                            disabled={isLoading}
                            className={`w-full py-4 xl:py-5 px-6 xl:px-8 rounded-xl font-semibold text-lg xl:text-xl transition-all flex items-center justify-center mt-8 xl:mt-10 ${!isLoading
                                ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {isLoading && (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 xl:w-6 xl:h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                                />
                            )}
                            {isLoading
                                ? (mode === 'signup' ? 'Creating Account...' : 'Signing In...')
                                : (mode === 'signup' ? 'Create Account' : 'Sign In')
                            }
                        </motion.button>
                    </motion.form>

                    {/* Toggle Mode */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center mt-8 xl:mt-10"
                    >
                        <p className="text-gray-600 text-base xl:text-lg">
                            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                            {' '}
                            <button
                                onClick={toggleMode}
                                disabled={isLoading}
                                className="text-teal-500 hover:text-teal-600 font-medium transition-colors disabled:opacity-50 underline decoration-2 underline-offset-2"
                            >
                                {mode === 'signup' ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Right Side Image - Desktop Only */}
            <div className="hidden lg:flex lg:w-1/4 xl:w-1/3 bg-gradient-to-bl from-gray-50 to-gray-100 relative overflow-hidden">
                <div className="relative z-10 flex flex-col justify-center items-center p-8 xl:p-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center"
                    >
                        <div className="w-36 h-36 xl:w-48 xl:h-48 bg-gradient-to-br from-teal-400 to-teal-600 rounded-3xl flex items-center justify-center mb-6 xl:mb-8 mx-auto shadow-2xl">
                            <svg className="w-18 h-18 xl:w-24 xl:h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl xl:text-2xl font-bold text-gray-800 mb-3 xl:mb-4">Start Learning Today</h3>
                        <p className="text-base xl:text-lg text-gray-600 leading-relaxed">
                            Access personalized lessons, track your progress, and join a supportive community of sign language learners.
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-24 h-24 xl:w-32 xl:h-32 bg-teal-200 bg-opacity-30 rounded-full -translate-y-12 xl:-translate-y-16 -translate-x-12 xl:-translate-x-16"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 xl:w-40 xl:h-40 bg-teal-300 bg-opacity-20 rounded-full translate-y-16 xl:translate-y-20 translate-x-16 xl:translate-x-20"></div>
            </div>
        </div>
    )
}

export default AuthFlow 