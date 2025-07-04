import { motion, AnimatePresence } from 'framer-motion'
import { pageVariants, buttonVariants } from '../animations/transitions'
import useLessonStore from '../store/lessonStore'
import useNavigationStore from '../store/navigationStore'
import SignDisplay from './SignDisplay'
import { getSignById } from '../data/signLanguageData'

const QuizScreen = () => {
    const {
        currentQuiz,
        selectedAnswer,
        showFeedback,
        isCorrect,
        selectAnswer,
        nextQuiz,
        returnToDashboard
    } = useLessonStore()
    const { setCurrentTab } = useNavigationStore()

    if (!currentQuiz) {
        return null
    }

    const handleAnswerSelect = (answer) => {
        if (!showFeedback) {
            selectAnswer(answer)
        }
    }

    const handleNext = () => {
        nextQuiz()
    }

    const handleBack = () => {
        setCurrentTab('overview') // Reset to overview tab when going back
        returnToDashboard()
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            className="min-h-screen bg-white"
        >
            {/* Header */}
            <div className="px-4 pt-8 pb-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBack}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>

                    {/* Progress indicator */}
                    <div className="flex-1 mx-4">
                        <div className="h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-teal-500 rounded-full w-1/2"></div>
                        </div>
                    </div>

                    <div className="w-10 h-10"></div>
                </div>

                {/* Question */}
                <h1 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-8">
                    {currentQuiz.question}
                </h1>
            </div>

            {/* Sign Display */}
            <div className="px-4 md:px-6 lg:px-8 mb-8">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex justify-center"
                >
                    <div className="w-full max-w-md">
                        {currentQuiz.word ? (
                            <SignDisplay
                                sign={{
                                    word: currentQuiz.word,
                                    description: currentQuiz.description || `Sign for ${currentQuiz.word}`,
                                    imageUrl: currentQuiz.image,
                                    instructions: currentQuiz.instructions,
                                    difficulty: 'beginner',
                                    category: 'quiz'
                                }}
                                showInstructions={false}
                            />
                        ) : (
                            <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-100 rounded-3xl flex items-center justify-center overflow-hidden mx-auto">
                                <img
                                    src={currentQuiz.image}
                                    alt="Sign language gesture"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Answer Options */}
            <div className="px-4 md:px-6 lg:px-8 space-y-4 mb-8">
                {currentQuiz.options.map((option, index) => (
                    <motion.button
                        key={option}
                        variants={buttonVariants}
                        whileHover={!showFeedback ? "hover" : {}}
                        whileTap={!showFeedback ? "tap" : {}}
                        onClick={() => handleAnswerSelect(option)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        disabled={showFeedback}
                        className={`
                            w-full p-4 rounded-2xl border-2 text-left transition-all duration-200
                            ${!showFeedback ? 'hover:shadow-lg' : ''}
                            ${selectedAnswer === option
                                ? showFeedback
                                    ? isCorrect
                                        ? 'bg-green-50 border-green-300'
                                        : 'bg-red-50 border-red-300'
                                    : 'bg-teal-50 border-teal-300'
                                : 'bg-white border-gray-200'
                            }
                            ${showFeedback && option === currentQuiz.correctAnswer && selectedAnswer !== option
                                ? 'bg-green-50 border-green-300'
                                : ''
                            }
                            ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                        `}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{option}</span>

                            {/* Status Icons */}
                            {showFeedback && (
                                <div className="flex items-center">
                                    {selectedAnswer === option ? (
                                        isCorrect ? (
                                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )
                                    ) : option === currentQuiz.correctAnswer ? (
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Feedback Section */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="px-4 md:px-6 lg:px-8 mb-8"
                    >
                        <div className={`
                            p-6 rounded-2xl border-2 flex items-center space-x-4
                            ${isCorrect
                                ? 'bg-green-50 border-green-200'
                                : 'bg-blue-50 border-blue-200'
                            }
                        `}>
                            {/* Character Avatar */}
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                {isCorrect ? (
                                    <div className="w-full h-full bg-green-100 flex items-center justify-center text-2xl">
                                        😊
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-blue-100 flex items-center justify-center text-2xl">
                                        🤔
                                    </div>
                                )}
                            </div>

                            {/* Feedback Text */}
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 mb-1">
                                    {isCorrect ? 'Correct answer' : 'Wrong answer'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {currentQuiz.explanation}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Next Button */}
            <div className="px-4 md:px-6 lg:px-8 pb-8">
                <AnimatePresence>
                    {showFeedback && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={handleNext}
                            className={`
                                w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-200
                                ${isCorrect
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-blue-500 hover:bg-blue-600'
                                }
                            `}
                        >
                            {isCorrect ? 'Next' : 'Retry'}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default QuizScreen 