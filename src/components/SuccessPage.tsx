import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SuccessPageProps {
  amount: string;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ amount }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!showConfetti) {
      setShowConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [showConfetti]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-green-500 animate-bounce">
        <CheckCircle className="w-16 h-16" />
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Payment Successful!</h2>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Amount: ${parseFloat(amount).toFixed(2)}
      </p>
    </div>
  );
};