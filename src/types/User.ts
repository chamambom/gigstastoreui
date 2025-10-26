// src/types/User.ts

export interface OnboardingStatus {
  basic_complete: boolean;
  provider_onboarding_complete: boolean;
  billing_setup_complete: boolean;
}

export interface User {
  id: number;
  email: string;
  is_provisional: boolean;
  is_verified: boolean;
  is_superuser: boolean;
  roles: ('user' | 'provider' | 'admin')[];
  onboarding_status: OnboardingStatus;
  provider_status: 'not_applied' | 'pending' | 'approved' | 'rejected';
  full_name?: string | null;
}

export interface AuthState {
  user: User | null;
}