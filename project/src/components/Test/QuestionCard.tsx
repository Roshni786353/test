import React from 'react';
import { Question } from '../../types';
import { Bookmark, BookmarkCheck, HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | null;
  isBookmarked: boolean;
  onAnswerSelect: (answer: number) => void;
  onBookmark: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  selectedAnswer,
  isBookmarked,
  onAnswerSelect,
  onBookmark
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {questionNumber}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Question {questionNumber}
              </h2>
              <p className="text-sm text-gray-500">{question.subject} • {question.chapter}</p>
            </div>
          </div>
          <button
            onClick={onBookmark}
            className={`p-3 rounded-full transition-all duration-300 ${
              isBookmarked 
                ? 'text-amber-600 bg-amber-50 hover:bg-amber-100 shadow-lg' 
                : 'text-gray-400 hover:text-amber-600 hover:bg-amber-50'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <HelpCircle className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-gray-900 leading-relaxed text-lg font-medium">{question.text}</p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 group ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md'
              }`}
            >
              <div className="flex items-center">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mr-4 text-sm font-bold transition-all duration-300 ${
                  selectedAnswer === index
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 group-hover:bg-blue-100 group-hover:text-blue-700'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className={`flex-1 font-medium transition-colors duration-300 ${
                  selectedAnswer === index ? 'text-blue-900' : 'text-gray-700 group-hover:text-blue-800'
                }`}>
                  {option}
                </span>
                {selectedAnswer === index && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center ml-4">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Question Info */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Select the most appropriate answer</span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              +4 marks for correct answer
              <span className="w-2 h-2 bg-red-400 rounded-full ml-4 mr-2"></span>
              -1 mark for wrong answer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;