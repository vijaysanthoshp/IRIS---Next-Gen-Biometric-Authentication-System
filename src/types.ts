export type AuthMethod = 'fingerprint' | 'face' | 'voice' | 'password';

export interface AuthState {
  selectedMethods: AuthMethod[];
  currentStep: 'login' | 'payment-type' | 'auth-selection' | 'location' | 'verification' | 'blockchain' | 'payment' | 'success';
  username: string;
  isDarkMode: boolean;
  amount: string;
  locationGranted: boolean;
  paymentDetails: {
    type: string;
    organization: string;
    accountNumber: string;
  } | null;
}