import React, { useEffect } from 'react';
import { Shield, Link as ChainLink } from 'lucide-react';

interface BlockchainAnimationProps {
  onComplete: () => void;
}

export const BlockchainAnimation: React.FC<BlockchainAnimationProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <div className="flex items-center space-x-4 animate-pulse">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
          <ChainLink className="w-6 h-6 text-blue-500 animate-spin" />
          <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
            <Shield className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>
      <p className="text-xl font-semibold text-center text-gray-600 dark:text-gray-400">
        Securing your token in the blockchain...
      </p>
    </div>
  );
};