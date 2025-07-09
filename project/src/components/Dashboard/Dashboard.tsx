import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';
import { Test, TestResult } from '../../types';
import { sampleTests } from '../../data/sampleTests';
import { BookOpen, Trophy, Clock, TrendingUp, Play, Calendar, Users, Target, Award, Brain, Zap, Star } from 'lucide-react';

interface DashboardProps {
  onTestStart: (testId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onTestStart }) => {
  const { user } = useAuth();
  const [availableTests, setAvailableTests] = useState<Test[]>([]);
  const [recentResults, setRecentResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    bestScore: 0,
    testsThisWeek: 0
  });

  useEffect(() => {
    if (user) {
      loadDashboardData();
      initializeSampleTests();
    }
  }, [user]);

  const initializeSampleTests = async () => {
    try {
      // Check if sample tests already exist
      const testsQuery = query(collection(db, 'tests'), limit(1));
      const testsSnapshot = await getDocs(testsQuery);
      
      if (testsSnapshot.empty) {
        // Add sample tests to Firestore
        for (const test of sampleTests) {
          await addDoc(collection(db, 'tests'), test);
        }
      }
    } catch (error) {
      console.error('Error initializing sample tests:', error);
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load available tests
      const testsQuery = query(
        collection(db, 'tests'),
        orderBy('createdAt', 'desc')
      );
      const testsSnapshot = await getDocs(testsQuery);
      const tests = testsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Test[];
      
      // If no tests in Firestore, use sample tests
      setAvailableTests(tests.length > 0 ? tests : sampleTests);

      // Load user's recent results
      const resultsQuery = query(
        collection(db, 'results'),
        where('userId', '==', user?.uid),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      const resultsSnapshot = await getDocs(resultsQuery);
      const results = resultsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TestResult[];
      setRecentResults(results);

      // Calculate stats
      const totalTests = results.length;
      const averageScore = results.length > 0 
        ? results.reduce((sum, result) => sum + result.score, 0) / results.length
        : 0;
      const bestScore = results.length > 0 
        ? Math.max(...results.map(result => result.score))
        : 0;
      
      const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const testsThisWeek = results.filter(result => result.timestamp > oneWeekAgo).length;

      setStats({
        totalTests,
        averageScore,
        bestScore,
        testsThisWeek
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
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

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'NEET':
        return <Brain className="h-6 w-6" />;
      case 'JEE':
        return <Zap className="h-6 w-6" />;
      case 'UPSC':
        return <Award className="h-6 w-6" />;
      default:
        return <BookOpen className="h-6 w-6" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2" />
            Welcome to TestSeries Pro
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Master Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Competitive Exams</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive test series for NEET, JEE, and UPSC preparation with AI-powered analytics and personalized learning paths.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Tests</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                <Trophy className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Average Score</p>
                <p className="text-3xl font-bold text-gray-900">{stats.averageScore.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Best Score</p>
                <p className="text-3xl font-bold text-gray-900">{stats.bestScore.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Week</p>
                <p className="text-3xl font-bold text-gray-900">{stats.testsThisWeek}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Tests */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Available Tests</h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {availableTests.length} tests available
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {availableTests.map((test) => (
                    <div key={test.id} className="group relative overflow-hidden rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                      <div className={`absolute inset-0 bg-gradient-to-r ${getSubjectColor(test.subject)} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                      <div className="relative p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${getSubjectColor(test.subject)} text-white mr-3`}>
                                {getSubjectIcon(test.subject)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 text-lg">{test.title}</h3>
                                <p className="text-sm text-gray-500">{test.chapter}</p>
                              </div>
                            </div>
                            <div className="flex items-center mt-3 space-x-6">
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-1" />
                                {test.duration} min
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Target className="h-4 w-4 mr-1" />
                                {test.questions.length} questions
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Trophy className="h-4 w-4 mr-1" />
                                {test.totalMarks} marks
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => onTestStart(test.id)}
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start Test
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Results & Quick Stats */}
          <div className="space-y-6">
            {/* Recent Results */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Recent Results</h2>
              </div>
              <div className="p-6">
                {recentResults.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-gray-500 font-medium">No test results yet</p>
                    <p className="text-sm text-gray-400 mt-1">Take your first test to see results here</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentResults.map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div>
                          <h3 className="font-medium text-gray-900">Test #{result.testId.slice(0, 8)}</h3>
                          <p className="text-sm text-gray-500">{formatDate(result.timestamp)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{result.score.toFixed(1)}%</p>
                          <p className="text-sm text-gray-500">
                            {result.correctAnswers}/{result.totalQuestions}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300">
                  <Brain className="h-5 w-5 mr-2" />
                  Practice Mode
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  View Analytics
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300">
                  <Award className="h-5 w-5 mr-2" />
                  Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;