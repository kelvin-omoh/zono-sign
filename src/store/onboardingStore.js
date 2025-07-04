import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { db, auth } from '../lib/firebase'

const useOnboardingStore = create(
    persist(
        (set, get) => ({
            // Current flow state
            currentStep: 0,
            isLoading: false,
            error: null,
            onboardingCompleted: false,

            // Form data
            formData: {
                signLanguageLevel: '',
                hoursPerDay: '',
                email: '',
                name: ''
            },

            // User state
            user: null,
            isAuthenticated: false,

            // Navigation actions
            nextStep: () => {
                const currentStep = get().currentStep
                const maxSteps = 5 // 0-5 for 6 steps
                if (currentStep < maxSteps) {
                    set({ currentStep: currentStep + 1 })
                }
            },

            prevStep: () => {
                const currentStep = get().currentStep
                if (currentStep > 0) {
                    set({ currentStep: currentStep - 1 })
                }
            },

            setStep: (step) => set({ currentStep: step }),

            // Form data management
            updateFormData: (field, value) => {
                set((state) => ({
                    formData: {
                        ...state.formData,
                        [field]: value
                    }
                }))
            },

            resetFormData: () => {
                set({
                    formData: {
                        signLanguageLevel: '',
                        hoursPerDay: '',
                        email: '',
                        name: ''
                    }
                })
            },

            // Loading and error states
            setLoading: (loading) => set({ isLoading: loading }),
            setError: (error) => set({ error }),
            clearError: () => set({ error: null }),

            // Firebase authentication
            signUp: async (email, password) => {
                const { setLoading, setError } = get()
                try {
                    setLoading(true)
                    setError(null)

                    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                    const user = userCredential.user

                    set({
                        user: {
                            uid: user.uid,
                            email: user.email
                        },
                        isAuthenticated: true
                    })

                    return user
                } catch (error) {
                    setError(error.message)
                    throw error
                } finally {
                    setLoading(false)
                }
            },

            signIn: async (email, password) => {
                const { setLoading, setError } = get()
                try {
                    setLoading(true)
                    setError(null)

                    const userCredential = await signInWithEmailAndPassword(auth, email, password)
                    const user = userCredential.user

                    set({
                        user: {
                            uid: user.uid,
                            email: user.email
                        },
                        isAuthenticated: true
                    })

                    return user
                } catch (error) {
                    setError(error.message)
                    throw error
                } finally {
                    setLoading(false)
                }
            },

            signOut: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    currentStep: 0
                })
            },

            // User state management
            setUser: (user) => set({ user }),
            setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

            // Firebase data persistence
            saveOnboardingData: async () => {
                const { formData, user, setLoading, setError } = get()

                if (!user) {
                    setError('User must be authenticated to save data')
                    return
                }

                try {
                    setLoading(true)
                    setError(null)

                    // Save user profile using user's UID as document ID
                    const userProfileData = {
                        uid: user.uid,
                        email: user.email,
                        name: formData.name,
                        signLanguageLevel: formData.signLanguageLevel,
                        hoursPerDay: formData.hoursPerDay,
                        onboardingCompleted: true,
                        completedAt: new Date(),
                        updatedAt: new Date()
                    }

                    // Use setDoc with user's UID as document ID for reliable retrieval
                    await setDoc(doc(db, 'users', user.uid), userProfileData)

                    // Also save to onboarding collection for analytics
                    const onboardingData = {
                        ...formData,
                        userId: user.uid,
                        completedAt: new Date(),
                        createdAt: new Date()
                    }
                    await addDoc(collection(db, 'onboarding'), onboardingData)

                    console.log('User data saved successfully to Firebase')
                    return user.uid
                } catch (error) {
                    console.error('Error saving to Firebase:', error)
                    setError(error.message)
                    throw error
                } finally {
                    setLoading(false)
                }
            },

            loadUserData: async (userId) => {
                const { setLoading, setError } = get()

                try {
                    setLoading(true)
                    setError(null)

                    console.log('Loading user data for:', userId)
                    const userDoc = await getDoc(doc(db, 'users', userId))

                    if (userDoc.exists()) {
                        const userData = userDoc.data()
                        console.log('User data loaded from Firebase:', userData)

                        set({
                            formData: {
                                signLanguageLevel: userData.signLanguageLevel || '',
                                hoursPerDay: userData.hoursPerDay || '',
                                email: userData.email || '',
                                name: userData.name || ''
                            },
                            onboardingCompleted: userData.onboardingCompleted || false
                        })
                        return userData
                    } else {
                        console.log('No user document found for:', userId)
                        // User document doesn't exist, this is fine for new users
                        return null
                    }
                } catch (error) {
                    console.error('Error loading user data:', error)
                    setError(error.message)
                    throw error
                } finally {
                    setLoading(false)
                }
            },

            // Complete onboarding flow
            completeOnboarding: async () => {
                const { saveOnboardingData, user } = get()

                try {
                    // First update the local state immediately for better UX
                    console.log('Completing onboarding and updating local state')
                    set({ onboardingCompleted: true })

                    // Then save to Firebase in the background
                    await saveOnboardingData()

                    // Also save all other store data to Firebase
                    if (user?.uid) {
                        // Access stores from window for auto-save
                        if (window.lessonStore) {
                            await window.lessonStore.saveToFirebase(user.uid)
                        }
                        if (window.achievementStore) {
                            await window.achievementStore.saveToFirebase(user.uid)
                        }
                        if (window.navigationStore) {
                            await window.navigationStore.saveToFirebase(user.uid)
                        }
                    }

                    console.log('Onboarding completed and all data saved to Firebase successfully')

                    return true
                } catch (error) {
                    console.error('Error completing onboarding:', error)
                    // Even if Firebase save fails, keep onboarding completed locally
                    // This ensures the user doesn't get stuck
                    return true
                }
            }
        }),
        {
            name: 'zero-zone-onboarding',
            partialize: (state) => ({
                currentStep: state.currentStep,
                formData: state.formData,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                onboardingCompleted: state.onboardingCompleted
            })
        }
    )
)

export default useOnboardingStore 