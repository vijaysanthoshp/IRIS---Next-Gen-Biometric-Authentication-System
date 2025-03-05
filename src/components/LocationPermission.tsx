import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationPermissionProps {
  onGrant: () => void;
  onDeny: () => void;
}

export const LocationPermission: React.FC<LocationPermissionProps> = ({ onGrant, onDeny }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
          <MapPin className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Location Access</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          We need your location to ensure secure transactions. This helps us protect your account from unauthorized access.
        </p>
        <div className="flex space-x-4 w-full">
          <button
            onClick={onDeny}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Deny
          </button>
          <button
            onClick={onGrant}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};