# 🌟 ZonoSign - Sign Language Learning Platform

A modern, responsive sign language learning application with complete user authentication and onboarding flow.

## ✨ Features

### 🔐 Authentication System
- **Secure Signup/Signin**: Email and password authentication with Firebase
- **Form Validation**: Real-time validation with user-friendly error messages
- **Session Persistence**: Users stay logged in across browser sessions
- **Password Security**: Minimum requirements and confirmation validation
- **Smooth Transitions**: Animated switching between signup and signin modes

### 📱 Responsive Onboarding Flow
- **6-Step Process**: Welcome → Experience Assessment → Time Commitment → Email → Name → Success
- **Mobile-First Design**: Optimized for all devices (375px to 1400px+)
- **Progress Tracking**: Visual progress bar with smooth animations
- **Form Persistence**: Data saved locally and to Firebase
- **Accessibility**: Screen reader friendly, keyboard navigation

### 🎨 Modern UI/UX
- **Framer Motion**: Professional animations and transitions
- **Tailwind CSS**: Utility-first styling system
- **Interactive Elements**: Hover effects, focus states, loading indicators
- **Error Handling**: User-friendly error messages and recovery
- **Professional Design**: Clean, modern interface with consistent branding

### 🗄️ State Management
- **Zustand**: Lightweight, scalable state management
- **Persistence**: Local storage integration for offline resilience
- **Firebase Sync**: Real-time data synchronization
- **Global State**: No props drilling, centralized data flow

## 🚀 Tech Stack

### Frontend
- **React 19.1.0** - Modern component framework
- **Vite 5.4.19** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Zustand** - Lightweight state management

### Backend
- **Firebase Authentication** - Secure user management
- **Firestore Database** - NoSQL database for user data
- **Firebase Analytics** - User behavior tracking (ready)

### Development Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **npm** - Package management

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zero-zone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   
   Create a Firebase project at [Firebase Console](https://console.firebase.google.com/):
   - Enable **Authentication** → **Email/Password** provider
   - Create **Firestore Database** in test mode
   - Register a web app to get configuration

4. **Environment Variables**
   
   Create a `.env` file in the project root:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

### For Users
1. **Create Account**: Sign up with email and password
2. **Complete Onboarding**: 6-step process to personalize learning
3. **Sign In**: Access your account anytime
4. **Data Persistence**: Your progress is automatically saved

### For Developers
1. **Component Structure**: Modular, reusable components
2. **State Management**: Centralized Zustand store
3. **Animation System**: Reusable Framer Motion presets
4. **Firebase Integration**: Authentication and data persistence

## 🏗️ Architecture

### Component Flow
```
MainApp (Auth Router)
├── AuthFlow (Signup/Signin)
│   ├── Form Validation
│   ├── Firebase Auth
│   └── Error Handling
└── OnboardingFlow (Protected)
    ├── WelcomeScreen
    ├── SignLanguageQuestion
    ├── HoursPerDayQuestion
    ├── EmailInput
    ├── NameInput
    └── StartLessons
```

### State Management
```
Zustand Store
├── Authentication State
├── Onboarding Data
├── Navigation State
├── Loading States
└── Error Handling
```

### Data Flow
```
User Input → Zustand Store → Firebase → UI Update
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1279px
- **Large**: 1280px+

### Features
- Mobile-first approach
- Touch-friendly interactions
- Scalable typography
- Flexible layouts
- Optimized images

## 🎬 Animations

### Framer Motion Features
- Page transitions
- Staggered list animations
- Interactive button effects
- Progress bar animations
- Form field focus states
- Loading indicators
- Error message animations

### Performance
- GPU acceleration
- Reduced motion support
- Optimized transforms
- Smooth 60fps animations

## 🔒 Security

### Firebase Security
- User-specific Firestore rules
- Authenticated-only operations
- Secure authentication flow
- Environment variable protection

### Form Security
- Input validation
- XSS prevention
- Secure password requirements
- Error message sanitization

## 📊 Performance

### Optimizations
- Code splitting ready
- Lazy loading components
- Optimized bundle size
- Fast development server
- Efficient state updates

### Metrics
- Page load: <2 seconds
- Lighthouse ready
- Mobile optimized
- Battery efficient animations

## 🧪 Testing

### Test the Flow
1. Open `http://localhost:5173` (or displayed port)
2. Create a new account
3. Complete the onboarding process
4. Check Firebase Console for user data
5. Sign out and sign back in

### Firebase Console
- **Authentication**: View created users
- **Firestore**: Check saved onboarding data
- **Analytics**: Monitor user behavior (if enabled)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AuthFlow.jsx    # Authentication component
│   ├── MainApp.jsx     # Main app router
│   ├── OnboardingFlow.jsx
│   └── ...
├── store/              # Zustand stores
│   └── onboardingStore.js
├── lib/                # Firebase configuration
│   └── firebase.js
├── animations/         # Framer Motion presets
│   └── transitions.js
└── assets/             # Static assets

memory-bank/            # Project documentation
├── projectbrief.md
├── techContext.md
├── systemPatterns.md
├── activeContext.md
├── progress.md
└── firebase-setup.md
```

## 🚀 Deployment

### Firebase Hosting (Recommended)
```bash
npm run build
firebase deploy
```

### Other Platforms
- Vercel
- Netlify
- AWS S3 + CloudFront

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- ESLint configuration
- Consistent formatting
- Component best practices
- Performance guidelines

## 📚 Documentation

### Memory Bank
Complete project documentation in `memory-bank/`:
- **Project Brief**: Goals and requirements
- **Technical Context**: Technology decisions
- **System Patterns**: Architecture patterns
- **Active Context**: Current development focus
- **Progress Tracking**: Feature completion status
- **Firebase Setup**: Configuration guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow existing code patterns
4. Update documentation
5. Test thoroughly
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

### Common Issues
- **Firebase errors**: Check environment variables
- **Build errors**: Ensure all dependencies installed
- **Authentication issues**: Verify Firebase configuration

### Resources
- [Firebase Documentation](https://firebase.google.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

---

Built with ❤️ for the hearing-impaired community. Making sign language learning accessible and engaging for everyone.
