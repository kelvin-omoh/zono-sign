import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import useOnboardingStore from '../store/onboardingStore'
import useLessonStore from '../store/lessonStore'
import useAchievementStore from '../store/achievementStore'
import useNavigationStore from '../store/navigationStore'
import AuthFlow from './AuthFlow'
import OnboardingFlow from './OnboardingFlow'
import WelcomeScreen from './WelcomeScreen'
import LessonFlow from './LessonFlow'

const MainApp = () => {
    const [authChecked, setAuthChecked] = useState(false)
    const [showWelcome, setShowWelcome] = useState(true)
    const [authMode, setAuthMode] = useState('signup') // 'signup' or 'signin'

    const {
        user,
        isAuthenticated,
        onboardingCompleted,
        setUser,
        setAuthenticated,
        loadUserData
    } = useOnboardingStore()

    const { loadFromFirebase: loadLessonData } = useLessonStore()
    const { loadFromFirebase: loadAchievementData } = useAchievementStore()
    const { loadFromFirebase: loadNavigationData } = useNavigationStore()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'User logged out')

            if (firebaseUser) {
                // User is signed in
                const userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email
                }
                console.log('Setting user data:', userData)
                setUser(userData)
                setAuthenticated(true)
                setShowWelcome(false) // Skip welcome if user is already authenticated

                // Try to load existing user data from Firebase
                try {
                    const loadedData = await loadUserData(firebaseUser.uid)
                    console.log('User data loaded:', loadedData)

                    // Set global user ID for stores
                    window.currentUserId = firebaseUser.uid

                    // Load all store data from Firebase
                    await Promise.all([
                        loadLessonData(firebaseUser.uid),
                        loadAchievementData(firebaseUser.uid),
                        loadNavigationData(firebaseUser.uid)
                    ])
                    console.log('All user store data loaded from Firebase')
                } catch (error) {
                    console.log('Error loading user data, starting fresh onboarding:', error)
                }
            } else {
                // User is signed out
                console.log('User signed out, resetting state')
                setUser(null)
                setAuthenticated(false)
                setShowWelcome(true) // Show welcome when signed out
                window.currentUserId = null // Clear global user ID
            }
            setAuthChecked(true)
        })

        return () => unsubscribe()
    }, [setUser, setAuthenticated, loadUserData])

    const handleWelcomeAction = (action) => {
        setAuthMode(action) // 'signup' or 'signin'
        setShowWelcome(false)
    }

    const handleAuthSuccess = () => {
        // After successful auth, user will be redirected to onboarding
        // The onAuthStateChanged listener will handle the state updates
    }

    const handleBackToWelcome = () => {
        setShowWelcome(true)
    }

    // Show loading screen while checking auth state
    if (!authChecked) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full"
                />
            </div>
        )
    }

    // Debug logging
    console.log('MainApp render state:', {
        showWelcome,
        isAuthenticated,
        onboardingCompleted,
        user: user?.uid || 'none'
    })

    return (
        <div className="min-h-screen bg-white">
            <AnimatePresence mode="wait">
                {showWelcome && !isAuthenticated ? (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <WelcomeScreen onAction={handleWelcomeAction} />
                    </motion.div>
                ) : !isAuthenticated ? (
                    <motion.div
                        key="auth"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AuthFlow
                            initialMode={authMode}
                            onAuthSuccess={handleAuthSuccess}
                            onBack={handleBackToWelcome}
                        />
                    </motion.div>
                ) : onboardingCompleted ? (
                    <motion.div
                        key="lessons"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <LessonFlow />
                    </motion.div>
                ) : (
                    <motion.div
                        key="onboarding"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <OnboardingFlow />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MainApp 