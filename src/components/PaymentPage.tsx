import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

interface PaymentPageProps {
  onSubmit: (amount: string) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount) {
      onSubmit(amount);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Enter Payment Amount</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="w-5 h-5 text-gray-400 dark:text-gray-300" />
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
        >
          Proceed to Pay
        </button>
      </form>
    </div>
  );
};