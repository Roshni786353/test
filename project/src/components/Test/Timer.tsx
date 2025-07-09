import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, Zap } from 'lucide-react';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isWarning, setIsWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          onTimeUp();
          return 0;
        }
        
        const newTime = prevTime - 1;
        setIsCritical(newTime <= 60); // Critical in last 1 minute
        setIsWarning(newTime <= 300 && newTime > 60); // Warning in last 5 minutes
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (isCritical) return 'from-red-500 to-red-600';
    if (isWarning) return 'from-amber-500 to-amber-600';
    return 'from-blue-500 to-blue-600';
  };

  const getBackgroundColor = () => {
    if (isCritical) return 'bg-red-50 border-red-200';
    if (isWarning) return 'bg-amber-50 border-amber-200';
    return 'bg-blue-50 border-blue-200';
  };

  const getIcon = () => {
    if (isCritical) return <AlertTriangle className="h-5 w-5" />;
    if (isWarning) return <Zap className="h-5 w-5" />;
    return <Clock className="h-5 w-5" />;
  };

  const getProgressPercentage = () => {
    return ((duration - timeLeft) / duration) * 100;
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border-2 ${getBackgroundColor()} transition-all duration-300 ${isCritical ? 'animate-pulse' : ''}`}>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gray-200 to-gray-300">
        <div 
          className={`h-full bg-gradient-to-r ${getTimerColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>
      
      <div className="flex items-center space-x-3 px-4 py-3">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${getTimerColor()} text-white`}>
          {getIcon()}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className={`font-mono text-xl font-bold ${isCritical ? 'text-red-700' : isWarning ? 'text-amber-700' : 'text-blue-700'}`}>
              {formatTime(timeLeft)}
            </span>
            {isCritical && (
              <span className="text-xs font-medium text-red-600 animate-bounce">
                HURRY!
              </span>
            )}
          </div>
          <p className={`text-xs font-medium ${isCritical ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-blue-600'}`}>
            {isCritical ? 'Time almost up!' : isWarning ? 'Time running out' : 'Time remaining'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Timer;