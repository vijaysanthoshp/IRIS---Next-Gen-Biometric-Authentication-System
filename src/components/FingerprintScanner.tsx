import React, { useEffect, useState } from 'react';
import { Fingerprint } from 'lucide-react';

interface FingerprintScannerProps {
  onComplete: () => void;
}

export const FingerprintScanner: React.FC<FingerprintScannerProps> = ({ onComplete }) => {
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setScanning(true);
        setTimeout(() => {
          setScanning(false);
          onComplete();
        }, 2000);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className={`relative p-8 rounded-full bg-blue-500/10 dark:bg-blue-500/20 ${
        scanning ? 'animate-pulse' : ''
      }`}>
        <Fingerprint className={`w-24 h-24 text-blue-500 ${
          scanning ? 'animate-spin' : ''
        }`} />
        <div className={`absolute inset-0 border-2 border-blue-500 rounded-full ${
          scanning ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        } transition-all duration-1000`} />
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        {scanning ? 'Scanning...' : 'Place your finger on the sensor'}
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400">
        Press spacebar to simulate fingerprint scan
      </p>
      <div className={`h-1 w-48 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${
        scanning ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-200`}>
        <div className="h-full bg-blue-500 animate-progress" />
      </div>
    </div>
  );
};