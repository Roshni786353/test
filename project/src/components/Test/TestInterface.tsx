import React, { useState, useEffect } from 'react';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';
import { Test, UserAnswer, TestResult } from '../../types';
import { sampleTests } from '../../data/sampleTests';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import QuestionNavigation from './QuestionNavigation';
import { ChevronLeft, ChevronRight, Flag, AlertCircle, BookOpen, Clock, Target } from 'lucide-react';

interface TestInterfaceProps {
  testId: string;
  onComplete: (result: TestResult) => void;
}

const TestInterface: React.FC<TestInterfaceProps> = ({ testId, onComplete }) => {
  const { user } = useAuth();
  const [test, setTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [loading, setLoading] = useState(true);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    loadTest();
    // Load saved answers from localStorage
    const savedAnswers = localStorage.getItem(`test_${testId}_answers`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, [testId]);

  useEffect(() => {
    // Save answers to localStorage whenever they change
    localStorage.setItem(`test_${testId}_answers`, JSON.stringify(answers));
  }, [answers, testId]);

  const loadTest = async () => {
    try {
      // First try to load from Firestore
      const testDoc = await getDoc(doc(db, 'tests', testId));
      if (testDoc.exists()) {
        setTest({ id: testDoc.id, ...testDoc.data() } as Test);
      } else {
        // Fallback to sample tests
        const sampleTest = sampleTests.find(t => t.id === testId);
        if (sampleTest) {
          setTest(sampleTest);
        }
      }
    } catch (error) {
      console.error('Error loading test:', error);
      // Fallback to sample tests
      const sampleTest = sampleTests.find(t => t.id === testId);
      if (sampleTest) {
        setTest(sampleTest);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (selectedOption: number) => {
    const questionId = currentQuestion.toString();
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        selectedOption,
        isBookmarked: prev[questionId]?.isBookmarked || false
      }
    }));
  };

  const handleBookmark = () => {
    const questionId = currentQuestion.toString();
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        questionId,
        selectedOption: prev[questionId]?.selectedOption || -1,
        isBookmarked: !prev[questionId]?.isBookmarked
      }
    }));
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit();
  };

  const calculateScore = () => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    test?.questions.forEach((question, index) => {
      const userAnswer = answers[index.toString()];
      
      if (!userAnswer || userAnswer.selectedOption === -1) {
        skipped++;
      } else if (userAnswer.selectedOption === question.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = test?.negativeMarking 
      ? (correct * 4) - (wrong * 1)
      : correct * 4;

    const percentage = test ? (score / (test.questions.length * 4)) * 100 : 0;

    return {
      score: Math.max(0, percentage), // Ensure score is not negative
      correct,
      wrong,
      skipped
    };
  };

  const handleSubmit = async () => {
    if (!test || !user) return;

    const { score, correct, wrong, skipped } = calculateScore();
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    const result: TestResult = {
      id: '',
      userId: user.uid,
      testId: test.id,
      score,
      totalQuestions: test.questions.length,
      correctAnswers: correct,
      wrongAnswers: wrong,
      skippedAnswers: skipped,
      timeTaken,
      answers: Object.keys(answers).reduce((acc, key) => {
        acc[key] = answers[key].selectedOption;
        return acc;
      }, {} as Record<string, number>),
      timestamp: endTime
    };

    try {
      const docRef = await addDoc(collection(db, 'results'), result);
      result.id = docRef.id;
      
      // Clear saved answers
      localStorage.removeItem(`test_${testId}_answers`);
      
      onComplete(result);
    } catch (error) {
      console.error('Error saving result:', error);
      // Even if saving fails, show results
      onComplete(result);
    }
  };

  const getUnansweredCount = () => {
    if (!test) return 0;
    return test.questions.length - Object.keys(answers).filter(key => answers[key].selectedOption !== -1).length;
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'NEET':
        return 'from-emerald-500 to-teal-600';
      case 'JEE':
        return 'from-blue-500 to-indigo-600';
      case 'UPSC':
        return 'from-purple-500 to-violet-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading test...</p>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Not Found</h2>
          <p className="text-gray-600">The requested test could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${getSubjectColor(test.subject)} text-white`}>
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{test.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    {test.subject} • {test.chapter}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {test.duration} minutes
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Timer 
                duration={test.duration * 60} 
                onTimeUp={handleTimeUp}
              />
              <button
                onClick={() => setShowSubmitDialog(true)}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Flag className="h-4 w-4 mr-2" />
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <QuestionCard
              question={test.questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              selectedAnswer={answers[currentQuestion.toString()]?.selectedOption || null}
              isBookmarked={answers[currentQuestion.toString()]?.isBookmarked || false}
              onAnswerSelect={handleAnswerSelect}
              onBookmark={handleBookmark}
            />

            {/* Enhanced Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </button>

              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Question {currentQuestion + 1} of {test.questions.length}
                  </span>
                </div>
                <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                  <span className="text-sm font-medium text-gray-700">
                    {Object.keys(answers).filter(key => answers[key].selectedOption !== -1).length} answered
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCurrentQuestion(prev => Math.min(test.questions.length - 1, prev + 1))}
                disabled={currentQuestion === test.questions.length - 1}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <QuestionNavigation
              totalQuestions={test.questions.length}
              currentQuestion={currentQuestion}
              answers={answers}
              onQuestionSelect={setCurrentQuestion}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Submit Dialog */}
      {showSubmitDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flag className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Submit Test</h3>
              <p className="text-gray-600">Are you sure you want to submit this test?</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{Object.keys(answers).filter(key => answers[key].selectedOption !== -1).length}</p>
                  <p className="text-gray-500">Answered</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{getUnansweredCount()}</p>
                  <p className="text-gray-500">Remaining</p>
                </div>
              </div>
              {getUnansweredCount() > 0 && (
                <p className="text-sm text-amber-600 mt-3 text-center">
                  ⚠️ You have {getUnansweredCount()} unanswered questions
                </p>
              )}
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowSubmitDialog(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestInterface;