import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { signLanguageData, SignLanguageAPI } from '../data/signLanguageData'
import SignDisplay from './SignDisplay'
import { staggerContainer, staggerItem } from '../animations/transitions'

const SignLanguageBrowser = () => {
    const [selectedCategory, setSelectedCategory] = useState('common')
    const [signs, setSigns] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredSigns, setFilteredSigns] = useState([])
    const [selectedSign, setSelectedSign] = useState(null)

    const categories = [
        { id: 'common', name: 'Common Signs', color: 'bg-green-500' },
        { id: 'advanced', name: 'Advanced Signs', color: 'bg-blue-500' },
        { id: 'iconic', name: 'Iconic Signs', color: 'bg-purple-500' },
        { id: 'names', name: 'Names & Places', color: 'bg-orange-500' }
    ]

    // Load signs for selected category
    useEffect(() => {
        const loadSigns = async () => {
            setLoading(true)
            try {
                const response = await SignLanguageAPI.fetchSignData(selectedCategory)
                setSigns(response.data.signs)
            } catch (error) {
                console.error('Error loading signs:', error)
                // Fallback to local data
                const categoryData = signLanguageData[selectedCategory]
                setSigns(categoryData?.signs || [])
            }
            setLoading(false)
        }

        loadSigns()
    }, [selectedCategory])

    // Filter signs based on search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredSigns(signs)
        } else {
            const filtered = signs.filter(sign =>
                sign.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sign.category.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredSigns(filtered)
        }
    }, [signs, searchQuery])

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId)
        setSearchQuery('')
        setSelectedSign(null)
    }

    const handleSearch = async (query) => {
        setSearchQuery(query)
        if (query.trim()) {
            try {
                const response = await SignLanguageAPI.searchSigns(query)
                setFilteredSigns(response.data)
            } catch (error) {
                console.error('Search error:', error)
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 py-6 md:px-6 lg:px-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Sign Language Dictionary
                    </h1>
                    <p className="text-gray-600">
                        Explore and learn sign language with detailed instructions and illustrations
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-4 md:px-6 lg:px-8 bg-white border-b border-gray-200">
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search signs..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Category Tabs */}
            <div className="px-4 py-4 md:px-6 lg:px-8 bg-white border-b border-gray-200">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl max-w-2xl">
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${selectedCategory === category.id
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${category.color}`} />
                                <span className="hidden sm:inline">{category.name}</span>
                                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="px-4 py-6 md:px-6 lg:px-8">
                {/* Category Info */}
                {!searchQuery && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            {signLanguageData[selectedCategory]?.title}
                        </h2>
                        <p className="text-gray-600">
                            {signLanguageData[selectedCategory]?.description}
                        </p>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center py-12">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full"
                        />
                    </div>
                )}

                {/* Signs Grid */}
                {!loading && (
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode="wait">
                            {filteredSigns.map((sign) => (
                                <motion.div
                                    key={sign.id}
                                    variants={staggerItem}
                                    layout
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    onClick={() => setSelectedSign(sign)}
                                    className="cursor-pointer"
                                >
                                    <SignDisplay
                                        sign={sign}
                                        showInstructions={false}
                                        className="h-full hover:shadow-lg transition-shadow duration-200"
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* No Results */}
                {!loading && filteredSigns.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No signs found</h3>
                        <p className="text-gray-600">
                            {searchQuery ?
                                `No signs match "${searchQuery}". Try a different search term.` :
                                'No signs available in this category.'
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Sign Detail Modal */}
            <AnimatePresence>
                {selectedSign && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                        onClick={() => setSelectedSign(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Sign Details
                                </h3>
                                <button
                                    onClick={() => setSelectedSign(null)}
                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-4">
                                <SignDisplay
                                    sign={selectedSign}
                                    showInstructions={true}
                                    className="border-0 shadow-none"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SignLanguageBrowser 