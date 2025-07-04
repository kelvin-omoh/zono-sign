import { motion, AnimatePresence } from 'framer-motion'
import useLessonStore from '../store/lessonStore'
import useNavigationStore from '../store/navigationStore'
import LessonDashboard from './LessonDashboard'
import QuizScreen from './QuizScreen'
import LessonComplete from './LessonComplete'
import ProgressScreen from './ProgressScreen'
import ProfileScreen from './ProfileScreen'
import AchievementsDetail from './AchievementsDetail'
import AchievementNotification from './AchievementNotification'
import SignLanguageBrowser from './SignLanguageBrowser'
import BottomNavigation from './BottomNavigation'

const LessonFlow = () => {
    const { currentLessonType, currentQuiz } = useLessonStore()
    const { currentTab } = useNavigationStore()

    const renderCurrentScreen = () => {
        // Show completion screen
        if (currentLessonType === 'complete') {
            return <LessonComplete key="complete" />
        }

        // Show quiz screen
        if (currentQuiz) {
            return <QuizScreen key="quiz" />
        }

        // Show screens based on navigation tab
        switch (currentTab) {
            case 'progress':
                return <ProgressScreen key="progress" />
            case 'profile':
                return <ProfileScreen key="profile" />
            case 'achievements':
                return <AchievementsDetail key="achievements" />
            case 'dictionary':
                return <SignLanguageBrowser key="dictionary" />
            case 'overview':
            default:
                return <LessonDashboard key="dashboard" />
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <AnimatePresence mode="wait">
                {renderCurrentScreen()}
            </AnimatePresence>

            {/* Show bottom navigation only when not in quiz or completion mode */}
            {!currentQuiz && currentLessonType !== 'complete' && (
                <BottomNavigation />
            )}

            {/* Achievement Notifications */}
            <AchievementNotification />
        </div>
    )
}

export default LessonFlow 