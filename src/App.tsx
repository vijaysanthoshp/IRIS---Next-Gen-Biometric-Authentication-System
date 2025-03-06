import React, { useState } from 'react';
import { AuthState, AuthMethod } from './types';
import { ThemeToggle } from './components/ThemeToggle';
import { LoginPage } from './components/LoginPage';
import { AuthSelection } from './components/AuthSelection';
import { LocationPermission } from './components/LocationPermission';
import { VerificationScore } from './components/VerificationScore';
import { BlockchainAnimation } from './components/BlockchainAnimation';
import { PaymentPage } from './components/PaymentPage';
import { SuccessPage } from './components/SuccessPage';
import { PaymentType } from './components/PaymentType';

function App() {
  const [state, setState] = useState<AuthState>({
    selectedMethods: [],
    currentStep: 'login',
    username: '',
    isDarkMode: false,
    amount: '',
    locationGranted: false,
    paymentDetails: null,
  });

  const toggleDarkMode = () => {
    setState(prev => {
      const newIsDarkMode = !prev.isDarkMode;
      if (newIsDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { ...prev, isDarkMode: newIsDarkMode };
    });
  };

  const handleLogin = (username: string) => {
    setState(prev => ({ ...prev, username, currentStep: 'payment-type' }));
  };

  const handleAuthMethodToggle = (method: AuthMethod) => {
    setState(prev => ({
      ...prev,
      selectedMethods: prev.selectedMethods.includes(method)
        ? prev.selectedMethods.filter(m => m !== method)
        : [...prev.selectedMethods, method],
    }));
  };

  const handleAuthContinue = () => {
    setState(prev => ({ ...prev, currentStep: 'location' }));
  };

  const handleLocationGrant = () => {
    setState(prev => ({ ...prev, locationGranted: true, currentStep: 'verification' }));
  };

  const handleLocationDeny = () => {
    setState(prev => ({ ...prev, currentStep: 'verification' }));
  };

  const handleVerificationComplete = () => {
    setState(prev => ({ ...prev, currentStep: 'blockchain' }));
  };

  const handleBlockchainComplete = () => {
    setState(prev => ({ ...prev, currentStep: 'payment' }));
  };

  const handlePaymentSubmit = (amount: string) => {
    setState(prev => ({ ...prev, amount, currentStep: 'success' }));
  };

  const handlePaymentTypeSubmit = (paymentDetails: {
    type: string;
    organization: string;
    accountNumber: string;
  }) => {
    setState(prev => ({
      ...prev,
      paymentDetails,
      currentStep: 'auth-selection'
    }));
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
      <ThemeToggle isDarkMode={state.isDarkMode} onToggle={toggleDarkMode} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {state.currentStep === 'login' && (
            <LoginPage onSubmit={handleLogin} />
          )}
          {state.currentStep === 'payment-type' && (
            <PaymentType onSubmit={handlePaymentTypeSubmit} />
          )}
          {state.currentStep === 'auth-selection' && (
            <AuthSelection
              selectedMethods={state.selectedMethods}
              onToggleMethod={handleAuthMethodToggle}
              onContinue={handleAuthContinue}
            />
          )}
          {state.currentStep === 'location' && (
            <LocationPermission
              onGrant={handleLocationGrant}
              onDeny={handleLocationDeny}
            />
          )}
          {state.currentStep === 'verification' && (
            <VerificationScore onComplete={handleVerificationComplete} />
          )}
          {state.currentStep === 'blockchain' && (
            <BlockchainAnimation onComplete={handleBlockchainComplete} />
          )}
          {state.currentStep === 'payment' && (
            <PaymentPage onSubmit={handlePaymentSubmit} />
          )}
          {state.currentStep === 'success' && (
            <SuccessPage amount={state.amount} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;