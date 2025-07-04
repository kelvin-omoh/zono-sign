import { motion } from 'framer-motion'
import { useState } from 'react'

const SignDisplay = ({ sign, showInstructions = true, className = "" }) => {
    const [imageError, setImageError] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)

    if (!sign) return null

    const handleImageError = () => {
        setImageError(true)
        setImageLoading(false)
    }

    const handleImageLoad = () => {
        setImageLoading(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm ${className}`}
        >
            {/* Sign Image */}
            <div className="relative bg-gray-50 p-6 flex items-center justify-center min-h-[200px]">
                {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full"
                        />
                    </div>
                )}

                {!imageError ? (
                    <img
                        src={sign.imageUrl}
                        alt={`Sign for ${sign.word}`}
                        className={`max-w-full max-h-48 object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                    />
                ) : (
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center">
                            <div className="text-4xl">
                                {sign.word === 'Hello' ? '👋' :
                                    sign.word === 'Thank You' ? '🙏' :
                                        sign.word === 'Please' ? '🤲' :
                                            sign.word === 'Sorry' ? '😔' :
                                                sign.word === 'Yes' ? '✅' :
                                                    sign.word === 'No' ? '❌' :
                                                        sign.word === 'Water' ? '💧' :
                                                            sign.word === 'Eat' ? '🍽️' :
                                                                sign.word === 'Remember' ? '🧠' :
                                                                    sign.word === 'Tree' ? '🌳' :
                                                                        sign.word === 'House' ? '🏠' :
                                                                            sign.word === 'Car' ? '🚗' :
                                                                                sign.word === 'Book' ? '📖' :
                                                                                    sign.word === 'Family' ? '👨‍👩‍👧‍👦' :
                                                                                        sign.word === 'Friend' ? '👫' :
                                                                                            '✋'}
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-700">{sign.word}</p>
                        <p className="text-xs text-gray-500 mt-1">Fallback illustration</p>
                    </div>
                )}

                {/* Difficulty Badge */}
                <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sign.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        sign.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {sign.difficulty}
                    </span>
                </div>
            </div>

            {/* Sign Details */}
            <div className="p-6">
                {/* Word */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {sign.word}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4">
                    {sign.description}
                </p>

                {/* Category */}
                {sign.category && (
                    <div className="mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                            {sign.category.replace('-', ' ')}
                        </span>
                    </div>
                )}

                {/* Instructions */}
                {showInstructions && sign.instructions && (
                    <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            How to sign
                        </h4>
                        <p className="text-sm text-blue-800">
                            {sign.instructions}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default SignDisplay 