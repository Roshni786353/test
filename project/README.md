# TestSeries - Comprehensive Exam Preparation Platform

A modern, responsive web application for NEET, JEE, and UPSC exam preparation with comprehensive test series, detailed analytics, and performance tracking.

## Features

### 🔐 Authentication System
- Firebase Authentication with Google OAuth and email/password
- Secure session management and password reset
- Email verification support
- Protected routes for authenticated users

### 📝 Test Engine
- MCQ renderer with 4 options per question
- Timer with auto-submit functionality
- Negative marking system (-1 for wrong, +4 for correct)
- Question navigation panel with status indicators
- Bookmark functionality for important questions
- Local storage backup for answers
- Detailed results calculation and display

### 📊 Dashboard & Analytics
- Comprehensive user dashboard with performance metrics
- Test history and progress tracking
- Subject-wise performance analysis
- Recent activity and upcoming tests

### 📱 Responsive Design
- Mobile-first approach with responsive breakpoints
- Optimized for tablets and desktop devices
- Touch-friendly interface elements
- Consistent design across all screen sizes

### 🎨 Design System
- Modern, clean interface with professional aesthetics
- Consistent color scheme (Primary: #1a73e8, Secondary: #f8f9fa)
- Inter font family for optimal readability
- Smooth transitions and micro-interactions
- Accessible design with proper contrast ratios

## Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── AuthPage.tsx
│   │   ├── LoginForm.tsx
│   │   └── SignUpForm.tsx
│   ├── Dashboard/
│   │   └── Dashboard.tsx
│   ├── Layout/
│   │   └── Navbar.tsx
│   └── Test/
│       ├── QuestionCard.tsx
│       ├── QuestionNavigation.tsx
│       ├── TestInterface.tsx
│       └── Timer.tsx
├── firebase/
│   └── config.ts
├── hooks/
│   └── useAuth.ts
├── types/
│   └── index.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Data Models

### User
```typescript
interface User {
  uid: string;
  name: string;
  email: string;
  progress: Record<string, number>;
  testHistory: string[];
}
```

### Test
```typescript
interface Test {
  id: string;
  title: string;
  subject: 'NEET' | 'JEE' | 'UPSC';
  chapter: string;
  questions: Question[];
  duration: number; // in minutes
  totalMarks: number;
  negativeMarking: boolean;
}
```

### Question
```typescript
interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  chapter: string;
}
```

### TestResult
```typescript
interface TestResult {
  id: string;
  userId: string;
  testId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedAnswers: number;
  timeTaken: number;
  answers: Record<string, number>;
  timestamp: number;
}
```

## Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Create a Firestore database
4. Update `src/firebase/config.ts` with your Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Database Schema

### Collections

#### `users`
- Document ID: User UID
- Fields: uid, name, email, progress, testHistory, createdAt

#### `tests`
- Document ID: Auto-generated
- Fields: title, subject, chapter, questions, duration, totalMarks, negativeMarking, createdAt

#### `questions`
- Document ID: Auto-generated
- Fields: text, options, correctAnswer, explanation, subject, chapter

#### `results`
- Document ID: Auto-generated
- Fields: userId, testId, score, totalQuestions, correctAnswers, wrongAnswers, skippedAnswers, timeTaken, answers, timestamp

## Security Rules

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /tests/{testId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /results/{resultId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    match /questions/{questionId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Performance Optimizations

- **Lazy Loading**: Components are loaded on-demand
- **Local Storage**: Test answers are backed up locally
- **Efficient Queries**: Firestore queries are optimized with proper indexing
- **Image Optimization**: All images are optimized for web
- **Bundle Size**: Minimal dependencies to keep bundle size under 200KB
- **Caching**: Firebase SDK caching is enabled

## Features Implementation Status

### Core Features ✅
- [x] Firebase Authentication (Google OAuth + Email/Password)
- [x] Test Engine with MCQ renderer
- [x] Timer with auto-submit
- [x] Question navigation and bookmarking
- [x] Negative marking system
- [x] Results calculation and display
- [x] Responsive design
- [x] Local storage backup

### Advanced Features 🚧
- [ ] Admin panel for question management
- [ ] Analytics dashboard with charts
- [ ] Test categories and filtering
- [ ] Performance comparisons
- [ ] Offline support with PWA
- [ ] Push notifications
- [ ] Social features (leaderboards, forums)

## Development Guidelines

### Code Quality
- TypeScript for type safety
- Modular component architecture
- Clean, readable code with proper comments
- Consistent naming conventions
- Error handling and loading states

### Testing
- Input validation on all forms
- Network error handling
- Cross-browser compatibility testing
- Mobile responsiveness testing
- Performance testing

### Security
- Firebase security rules implementation
- Input sanitization
- Secure authentication flows
- Protected routes
- Data validation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@testseries.com or join our Discord community.