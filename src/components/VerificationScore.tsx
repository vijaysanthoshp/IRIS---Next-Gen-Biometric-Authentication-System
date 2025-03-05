import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface VerificationScoreProps {
  onComplete: () => void;
}

export const VerificationScore: React.FC<VerificationScoreProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(80);
      setTimeout(onComplete, 2000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 dark:text-gray-700 stroke-current"
            strokeWidth="10"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="text-blue-500 dark:text-blue-400 stroke-current"
            strokeWidth="10"
            strokeLinecap="round"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{
              strokeDasharray: `${2 * Math.PI * 45}`,
              strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`,
              transition: 'stroke-dashoffset 1s ease-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{progress}%</span>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-green-500 dark:text-green-400">
        <CheckCircle className="w-6 h-6" />
        <span className="text-xl font-semibold text-gray-900 dark:text-white">Verification Successful</span>
      </div>
    </div>
  );
};