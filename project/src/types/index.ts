export interface User {
  uid: string;
  name: string;
  email: string;
  progress: Record<string, number>;
  testHistory: string[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  chapter: string;
}

export interface Test {
  id: string;
  title: string;
  subject: 'NEET' | 'JEE' | 'UPSC';
  chapter: string;
  questions: Question[];
  duration: number; // in minutes
  totalMarks: number;
  negativeMarking: boolean;
}

export interface TestResult {
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

export interface UserAnswer {
  questionId: string;
  selectedOption: number;
  isBookmarked: boolean;
}