import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

const useNavigationStore = create(
    persist(
        (set, get) => ({
            // Navigation state
            currentTab: 'overview', // 'overview', 'progress', 'profile', 'achievements'

            // Navigation actions
            setCurrentTab: (tab) => set({ currentTab: tab }),

            // Reset all data (for sign out)
            reset: () => set({
                currentTab: 'overview'
            }),

            // Firebase data persistence
            saveToFirebase: async (userId) => {
                if (!userId) return

                try {
                    const state = get()
                    const navigationData = {
                        currentTab: state.currentTab,
                        updatedAt: new Date()
                    }

                    await setDoc(doc(db, 'userNavigation', userId), navigationData)
                    console.log('Navigation data saved to Firebase')
                } catch (error) {
                    console.error('Error saving navigation data to Firebase:', error)
                }
            },

            loadFromFirebase: async (userId) => {
                if (!userId) return

                try {
                    const docRef = doc(db, 'userNavigation', userId)
                    const docSnap = await getDoc(docRef)

                    if (docSnap.exists()) {
                        const data = docSnap.data()
                        set({
                            currentTab: data.currentTab || 'overview'
                        })
                        console.log('Navigation data loaded from Firebase')
                        return data
                    } else {
                        console.log('No navigation data found in Firebase')
                        return null
                    }
                } catch (error) {
                    console.error('Error loading navigation data from Firebase:', error)
                    return null
                }
            },

            clearFirebaseData: async (userId) => {
                if (!userId) return

                try {
                    await setDoc(doc(db, 'userNavigation', userId), {
                        currentTab: 'overview',
                        updatedAt: new Date()
                    })
                    console.log('Navigation data cleared from Firebase')
                } catch (error) {
                    console.error('Error clearing navigation data from Firebase:', error)
                }
            },

            // Tab definitions
            tabs: [
                {
                    id: 'overview',
                    label: 'Overview',
                    icon: 'home'
                },
                {
                    id: 'dictionary',
                    label: 'Dictionary',
                    icon: 'book'
                },
                {
                    id: 'progress',
                    label: 'Progress',
                    icon: 'progress'
                },
                {
                    id: 'profile',
                    label: 'Profile',
                    icon: 'profile'
                }
            ]
        }),
        {
            name: 'navigation-storage',
            partialize: (state) => ({
                currentTab: state.currentTab
            })
        }
    )
)

// Expose store to window for global access
if (typeof window !== 'undefined') {
    window.navigationStore = useNavigationStore.getState()
}

export default useNavigationStore 