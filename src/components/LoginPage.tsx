import React, { useState } from 'react';
import { User } from 'lucide-react';

interface LoginPageProps {
  onSubmit: (username: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 space-y-6">
      <div className="p-4 rounded-full bg-blue-500/10 dark:bg-blue-500/20">
        <User className="w-12 h-12 text-blue-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome To IRIS</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your username"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
        >
          Continue
        </button>
      </form>
    </div>
  );
};