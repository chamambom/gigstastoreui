// src/types/User.ts

// --- Nested Interfaces ---

export interface GeoLocation {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
}

export interface OAuthAccount {
    id: { $oid: string };
    oauth_name: string;
    access_token: string;
    account_id: string;
    account_email: string;
    expires_at: number;
    refresh_token: string | null;
}

export interface Address {
    formatted: string;
    street_number: string;
    street: string;
    locality: string;
    city: string;
    region: string;
    postcode: string;
    latitude: number;
    longitude: number;
}

export interface OnboardingStatus {
    basic_complete: boolean;
    provider_onboarding_complete: boolean;
    billing_setup_complete: boolean;
}

// --- Main User Interface ---

export interface User {
    // Database & Core Fields
    _id: string;
    email: string;
    hashed_password: string;
    id?: number; // Added from previous context, though not explicitly in model, keeping for robustness if ID is mapped separately

    // Status Flags
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    is_provisional: boolean;
    is_oauth_registered: boolean;

    // Roles and Provider Status
    roles?: ('user' | 'provider' | 'admin')[];
    provider_status: 'not_applied' | 'pending' | 'approved' | 'rejected';

    // Profile Information
    full_name: string;
    profile_picture?: string; // Appears as 'string' in model, suggesting it's a URL/path
    phone_number?: string;
    tradingName?: string;

    // Nested Objects
    oauth_accounts?: OAuthAccount[];
    address?: Address;
    location?: GeoLocation;
    onboarding_status?: Partial<OnboardingStatus>;

    // Dates
    created_at: string;
    last_verify_request?: string;

    // Billing/Stripe
    stripe_customer_id?: string;
    stripe_subscription_id?: string;
    stripe_subscription_price_id?: string;
    stripe_payment_method_id?: string;

    // Provider Stats
    overallProviderRating: number;
    totalProviderReviews: number;
}

// --- Auth Store State Interface ---

export interface AuthState {
    user: User | null;
}