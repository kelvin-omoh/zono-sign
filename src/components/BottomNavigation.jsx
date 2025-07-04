import { motion } from 'framer-motion'
import useNavigationStore from '../store/navigationStore'

const BottomNavigation = () => {
    const { currentTab, setCurrentTab } = useNavigationStore()

    const tabs = [
        {
            id: 'overview',
            label: 'Overview',
            icon: (isActive) => (
                <svg className={`w-6 h-6 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
            )
        },
        {
            id: 'progress',
            label: 'Progress',
            icon: (isActive) => (
                <svg className={`w-6 h-6 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            id: 'profile',
            label: 'Profile',
            icon: (isActive) => (
                <svg className={`w-6 h-6 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        }
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
            <div className="flex items-center justify-around py-2">
                {tabs.map((tab) => {
                    const isActive = currentTab === tab.id

                    return (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentTab(tab.id)}
                            className="flex flex-col items-center p-2 relative"
                        >
                            {tab.icon(isActive)}
                            <span className={`text-xs mt-1 font-medium ${isActive ? 'text-teal-600' : 'text-gray-500'
                                }`}>
                                {tab.label}
                            </span>

                            {/* Active indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-600 rounded-full"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}

export default BottomNavigation 