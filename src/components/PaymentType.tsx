import React, { useState } from 'react';
import { Building2, Users, Factory, CreditCard } from 'lucide-react';

interface PaymentTypeProps {
  onSubmit: (paymentDetails: {
    type: string;
    organization: string;
    accountNumber: string;
  }) => void;
}

export const PaymentType: React.FC<PaymentTypeProps> = ({ onSubmit }) => {
  const [paymentType, setPaymentType] = useState('');
  const [organization, setOrganization] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const paymentTypes = [
    { id: 'retail', icon: <CreditCard className="w-6 h-6" />, label: 'Retail Payment' },
    { id: 'wholesale', icon: <Factory className="w-6 h-6" />, label: 'Wholesale Payment' },
    { id: 'b2b', icon: <Building2 className="w-6 h-6" />, label: 'Business to Business Payment' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentType && organization && accountNumber) {
      onSubmit({
        type: paymentType,
        organization,
        accountNumber,
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        Payment Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {paymentTypes.map(({ id, icon, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setPaymentType(id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                paymentType === id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <div className="text-blue-500 dark:text-blue-400">
                {icon}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Organization Name
            </label>
            <input
              id="organization"
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Account Number
            </label>
            <input
              id="accountNumber"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!paymentType || !organization || !accountNumber}
        >
          Continue
        </button>
      </form>
    </div>
  );
};