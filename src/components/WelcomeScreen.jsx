import { motion } from 'framer-motion'
import { buttonVariants, floatingVariants } from '../animations/transitions'

const WelcomeScreen = ({ onAction }) => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
            {/* Mobile Background Elements */}
            <div className="lg:hidden absolute inset-0 pointer-events-none">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-blue-50"></div>

                {/* Floating Shapes */}
                <motion.div
                    animate={{
                        y: [-20, 20, -20],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 right-8 w-24 h-24 bg-gradient-to-br from-teal-200 to-teal-300 rounded-3xl opacity-30"
                />

                <motion.div
                    animate={{
                        y: [20, -20, 20],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-40 left-4 w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl opacity-25"
                />

                <motion.div
                    animate={{
                        y: [-15, 15, -15],
                        x: [-10, 10, -10],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-32 right-12 w-20 h-20 bg-gradient-to-br from-teal-300 to-cyan-300 rounded-full opacity-20"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-60 left-8 w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl opacity-30"
                />
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center relative z-10">
                {/* Mobile Layout */}
                <div className="lg:hidden px-6 py-12 min-h-screen flex flex-col">
                    {/* Logo/Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center justify-center w-24 h-24 mb-6">
                            <img
                                src="/logo.png"
                                alt="ZonoSign Logo"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent mb-2">
                            ZonoSign
                        </h1>
                        <p className="text-teal-600 font-medium text-sm tracking-wide uppercase">
                            Sign Language Learning
                        </p>
                    </motion.div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                Master Sign Language
                                <span className="block text-transparent bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text">
                                    Step by Step
                                </span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-sm mx-auto">
                                Join thousands learning with personalized lessons designed for your success
                            </p>

                            {/* Feature Pills */}
                            <div className="flex flex-wrap justify-center gap-3 mb-8">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-teal-100"
                                >
                                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                                    <span className="text-sm font-medium text-gray-700">Personalized</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-blue-100"
                                >
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                    <span className="text-sm font-medium text-gray-700">Interactive</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-purple-100"
                                >
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                    <span className="text-sm font-medium text-gray-700">Progress Tracking</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            className="space-y-4 mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {/* Primary Button */}
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => onAction('signup')}
                                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center justify-center">
                                    Get Started Free
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </motion.button>

                            {/* Secondary Button */}
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => onAction('signin')}
                                className="w-full bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-teal-300 text-gray-700 hover:text-teal-700 py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <span className="flex items-center justify-center">
                                    I Have an Account
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </motion.button>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-center"
                        >
                            <div className="flex items-center justify-center space-x-6 mb-4">
                                <div className="flex items-center">
                                    <div className="flex -space-x-2">
                                        <img
                                            src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
                                            alt="Happy learner"
                                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
                                            alt="Happy learner"
                                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
                                            alt="Happy learner"
                                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
                                            alt="Happy learner"
                                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                        />
                                    </div>
                                    <span className="ml-3 text-sm font-medium text-gray-600">10k+ learners</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-gray-600">4.9/5</span>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                                By continuing, you agree to our{' '}
                                <a href="#" className="text-teal-500 underline">Terms</a> and{' '}
                                <a href="#" className="text-teal-500 underline">Privacy Policy</a>
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Desktop Layout - Now with Logo */}
                <div className="hidden lg:block p-6 lg:p-12 lg:pr-6">
                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                        {/* Logo/Brand Section - Desktop */}
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col lg:flex-row lg:items-center mb-8 lg:mb-12"
                        >
                            <div className="flex items-center justify-center lg:justify-start mb-4 lg:mb-0 lg:mr-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24">
                                    <img
                                        src="/logo.png"
                                        alt="ZonoSign Logo"
                                        className="w-full h-full object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>
                            <div className="lg:flex-1">
                                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent mb-2">
                                    ZonoSign
                                </h1>
                                <p className="text-teal-600 font-medium text-sm lg:text-base tracking-wide uppercase">
                                    Sign Language Learning
                                </p>
                            </div>
                        </motion.div>

                        {/* Welcome Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                                Master Sign Language
                                <span className="block text-transparent bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text">
                                    Step by Step
                                </span>
                            </h2>
                            <p className="text-gray-600 text-base md:text-lg lg:text-xl xl:text-2xl mb-8 lg:mb-12 leading-relaxed">
                                Join thousands learning with personalized lessons designed for your learning pace and success.
                            </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            className="space-y-4 lg:space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => onAction('signup')}
                                className="w-full max-w-md mx-auto lg:mx-0 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-4 lg:py-5 px-8 rounded-xl lg:rounded-2xl font-bold text-lg lg:text-xl shadow-lg hover:shadow-xl transition-all duration-300 block relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center justify-center">
                                    Get Started Free
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </motion.button>

                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => onAction('signin')}
                                className="w-full max-w-md mx-auto lg:mx-0 bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-teal-300 text-gray-700 hover:text-teal-700 py-4 lg:py-5 px-8 rounded-xl lg:rounded-2xl font-semibold text-lg lg:text-xl transition-all duration-300 shadow-lg hover:shadow-xl block"
                            >
                                <span className="flex items-center justify-center">
                                    I Have an Account
                                    <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </motion.button>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            className="mt-8 lg:mt-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-2xl mx-auto lg:mx-0">
                                <div className="text-center lg:text-left">
                                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-3">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Personalized Learning</h3>
                                    <p className="text-sm text-gray-600">Tailored lessons based on your pace and goals</p>
                                </div>

                                <div className="text-center lg:text-left">
                                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-3">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Track Progress</h3>
                                    <p className="text-sm text-gray-600">Monitor your improvement every step of the way</p>
                                </div>

                                <div className="text-center lg:text-left">
                                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-3">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Inclusive Design</h3>
                                    <p className="text-sm text-gray-600">Built specifically for the hearing-impaired community</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Terms */}
                        <motion.div
                            className="mt-8 lg:mt-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <div className="flex items-start space-x-3 max-w-md mx-auto lg:mx-0">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    defaultChecked
                                    className="mt-1 w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
                                />
                                <label htmlFor="terms" className="text-sm lg:text-base text-gray-600 leading-relaxed">
                                    I agree to ZonoSign's{' '}
                                    <a href="#" className="text-teal-500 hover:text-teal-600 underline">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-teal-500 hover:text-teal-600 underline">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Illustration Section - Desktop Only */}
            <div className="hidden lg:flex flex-1 items-center justify-center p-6 lg:p-12 lg:pl-6 bg-gray-50">
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="w-full max-w-md lg:max-w-lg"
                >
                    <img
                        src="/home.png"
                        alt="Sign language learning illustration"
                        className="w-full h-auto rounded-2xl shadow-lg lg:shadow-2xl"
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default WelcomeScreen 