import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import AuthPage from './components/Auth/AuthPage';
import Dashboard from './components/Dashboard/Dashboard';
import TestInterface from './components/Test/TestInterface';
import Navbar from './components/Layout/Navbar';
import { TestResult } from './types';
import { Trophy, Award, Target, TrendingUp, RotateCcw, Download } from 'lucide-react';

function App() {
  const { user, loading } = useAuth();
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleTestStart = (testId: string) => {
    setCurrentTest(testId);
    setTestResult(null);
  };

  const handleTestComplete = (result: TestResult) => {
    setTestResult(result);
    setCurrentTest(null);
  };

  const handleBackToDashboard = () => {
    setCurrentTest(null);
    setTestResult(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-emerald-600';
    if (score >= 60) return 'from-blue-500 to-blue-600';
    if (score >= 40) return 'from-amber-500 to-amber-600';
    return 'from-red-500 to-red-600';
  };

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return { message: "Outstanding Performance! 🎉", color: "text-emerald-600" };
    if (score >= 80) return { message: "Excellent Work! 👏", color: "text-emerald-600" };
    if (score >= 70) return { message: "Good Job! 👍", color: "text-blue-600" };
    if (score >= 60) return { message: "Well Done! 😊", color: "text-blue-600" };
    if (score >= 50) return { message: "Keep Practicing! 💪", color: "text-amber-600" };
    return { message: "Need More Practice 📚", color: "text-red-600" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading TestSeries...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (currentTest) {
    return (
      <TestInterface
        testId={currentTest}
        onComplete={handleTestComplete}
      />
    );
  }

  if (testResult) {
    const performance = getPerformanceMessage(testResult.score);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className={`bg-gradient-to-r ${getScoreColor(testResult.score)} p-8 text-center text-white`}>
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-bold mb-2">Test Completed!</h2>
              <p className="text-xl opacity-90">Here are your detailed results</p>
            </div>

            {/* Score Section */}
            <div className="p-8 text-center border-b border-gray-100">
              <div className="mb-6">
                <div className={`text-6xl font-bold bg-gradient-to-r ${getScoreColor(testResult.score)} bg-clip-text text-transparent mb-2`}>
                  {testResult.score.toFixed(1)}%
                </div>
                <p className={`text-xl font-semibold ${performance.color}`}>
                  {performance.message}
                </p>
              </div>
              
              {/* Circular Progress */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - testResult.score / 100)}`}
                    className={testResult.score >= 70 ? 'text-emerald-500' : testResult.score >= 50 ? 'text-blue-500' : 'text-red-500'}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-700">{testResult.score.toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-emerald-600 font-semibold text-sm">Correct Answers</p>
                  <p className="text-3xl font-bold text-emerald-700">{testResult.correctAnswers}</p>
                </div>
                
                <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-100">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-red-600 font-semibold text-sm">Wrong Answers</p>
                  <p className="text-3xl font-bold text-red-700">{testResult.wrongAnswers}</p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-600 font-semibold text-sm">Skipped</p>
                  <p className="text-3xl font-bold text-gray-700">{testResult.skippedAnswers}</p>
                </div>
                
                <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-blue-600 font-semibold text-sm">Accuracy</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {testResult.correctAnswers > 0 ? ((testResult.correctAnswers / (testResult.correctAnswers + testResult.wrongAnswers)) * 100).toFixed(1) : 0}%
                  </p>
                </div>
              </div>

              {/* Time Stats */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Time Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{Math.floor(testResult.timeTaken / 60)}m {testResult.timeTaken % 60}s</p>
                    <p className="text-sm text-gray-600">Total Time Taken</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{(testResult.timeTaken / testResult.totalQuestions / 60).toFixed(1)}m</p>
                    <p className="text-sm text-gray-600">Avg. Time per Question</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{testResult.totalQuestions}</p>
                    <p className="text-sm text-gray-600">Total Questions</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBackToDashboard}
                  className="flex-1 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Back to Dashboard
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Result
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <Dashboard onTestStart={handleTestStart} />
    </div>
  );
}

export default App;