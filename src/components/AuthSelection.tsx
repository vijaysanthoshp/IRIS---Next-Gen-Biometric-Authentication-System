import React from 'react';
import { Fingerprint, Facebook as Face, Mic, Lock } from 'lucide-react';
import { AuthMethod } from '../types';
import { Chatbot } from './Chatbot';

interface AuthSelectionProps {
  selectedMethods: AuthMethod[];
  onToggleMethod: (method: AuthMethod) => void;
  onContinue: () => void;
}

export const AuthSelection: React.FC<AuthSelectionProps> = ({
  selectedMethods,
  onToggleMethod,
  onContinue,
}) => {
  const methods: { id: AuthMethod; icon: React.ReactNode; label: string }[] = [
    { id: 'fingerprint', icon: <Fingerprint className="w-6 h-6 text-black dark:text-white" />, label: 'Fingerprint' },
    { id: 'face', icon: <Face className="w-6 h-6 text-black dark:text-white" />, label: 'Face Recognition' },
    { id: 'voice', icon: <Mic className="w-6 h-6 text-black dark:text-white" />, label: 'Voice Recognition' },
    { id: 'password', icon: <Lock className="w-6 h-6 text-black dark:text-white" />, label: 'Password' },
  ];

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Choose Authentication Methods
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Select at least two methods to continue
        </p>
        <div className="grid grid-cols-2 gap-4">
          {methods.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => onToggleMethod(id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedMethods.includes(id)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                {icon}
                <span className="text-sm font-medium text-black dark:text-white">{label}</span>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={onContinue}
          disabled={selectedMethods.length < 2}
          className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Continue
        </button>
      </div>
      <Chatbot />
    </>
  );
};