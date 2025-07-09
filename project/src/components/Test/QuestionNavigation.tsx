import React from 'react';
import { UserAnswer } from '../../types';
import { CheckCircle, Circle, Bookmark, AlertCircle } from 'lucide-react';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<string, UserAnswer>;
  onQuestionSelect: (questionIndex: number) => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  totalQuestions,
  currentQuestion,
  answers,
  onQuestionSelect
}) => {
  const getQuestionStatus = (questionIndex: number) => {
    const answer = answers[questionIndex];
    
    if (!answer) return 'unanswered';
    if (answer.isBookmarked && answer.selectedOption !== -1) return 'answered-bookmarked';
    if (answer.isBookmarked) return 'bookmarked';
    if (answer.selectedOption !== -1) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status: string, isCurrent: boolean) => {
    if (isCurrent) return 'bg-blue-600 text-white border-blue-600 shadow-lg ring-4 ring-blue-200';
    
    switch (status) {
      case 'answered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200 shadow-md';
      case 'bookmarked':
        return 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200 shadow-md';
      case 'answered-bookmarked':
        return 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200 shadow-md';
      default:
        return 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-sm';
    }
  };

  const getStatusCount = (status: string) => {
    return Object.values(answers).filter(answer => {
      if (status === 'answered') return answer.selectedOption !== -1 && !answer.isBookmarked;
      if (status === 'bookmarked') return answer.isBookmarked && answer.selectedOption === -1;
      if (status === 'answered-bookmarked') return answer.selectedOption !== -1 && answer.isBookmarked;
      return false;
    }).length;
  };

  const unansweredCount = totalQuestions - Object.keys(answers).filter(key => answers[key].selectedOption !== -1).length;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 sticky top-8">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Question Navigation</h3>
        
        {/* Status Legend */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
              <span className="text-sm text-gray-600">Answered</span>
            </div>
            <span className="text-sm font-semibold text-emerald-600">{getStatusCount('answered')}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bookmark className="w-4 h-4 text-amber-600 mr-2" />
              <span className="text-sm text-gray-600">Bookmarked</span>
            </div>
            <span className="text-sm font-semibold text-amber-600">{getStatusCount('bookmarked')}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Both</span>
            </div>
            <span className="text-sm font-semibold text-purple-600">{getStatusCount('answered-bookmarked')}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Circle className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Unanswered</span>
            </div>
            <span className="text-sm font-semibold text-gray-600">{unansweredCount}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(((totalQuestions - unansweredCount) / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((totalQuestions - unansweredCount) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Grid */}
      <div className="p-6">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }, (_, index) => {
            const status = getQuestionStatus(index);
            const isCurrent = index === currentQuestion;
            
            return (
              <button
                key={index}
                onClick={() => onQuestionSelect(index)}
                className={`
                  w-12 h-12 rounded-xl border-2 text-sm font-bold transition-all duration-300 transform hover:scale-105
                  ${getStatusColor(status, isCurrent)}
                  ${isCurrent ? 'animate-pulse' : ''}
                `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-t border-gray-100 bg-gray-50/50">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Quick Stats</p>
          <div className="flex justify-center space-x-4 text-xs">
            <div className="text-center">
              <p className="font-bold text-blue-600">{currentQuestion + 1}</p>
              <p className="text-gray-500">Current</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-emerald-600">{Object.keys(answers).filter(key => answers[key].selectedOption !== -1).length}</p>
              <p className="text-gray-500">Done</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-600">{unansweredCount}</p>
              <p className="text-gray-500">Left</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;