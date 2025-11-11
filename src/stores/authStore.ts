// src/stores/authStore.ts
import {defineStore} from 'pinia';
import axios from 'axios';
import type {User, AuthState, OnboardingStatus} from '../types/User';

export const useAuthStore = defineStore('auth', {
    // 1. STATE
    state: (): AuthState => ({
        user: null,
    }),

    // 2. GETTERS
    getters: {
        isAuthenticated: (state): boolean => {
            const tokenVal = localStorage.getItem('token');
            const userVal = state.user;
            console.log(`INSIDE GETTER: tokenVal:`, tokenVal ? 'present' : 'null', `userVal:`, userVal ? 'present' : 'null');
            return !!tokenVal && !!userVal;
        },
        currentUser: (state): User | null => state.user,
        isProvisional: (state): boolean => state.user?.is_provisional || false,
        isVerified: (state): boolean => state.user?.is_verified || false,
        isSuper: (state): boolean => state.user?.is_superuser || false,
        isProvider: (state): boolean => state.user?.roles?.includes('provider') || false,
        isSeeker: (state): boolean => state.user?.roles?.includes('user') || false,
        hasBasicProfile: (state): boolean => state.user?.onboarding_status?.basic_complete || false,
        hasProviderOnboarding: (state): boolean => state.user?.onboarding_status?.provider_onboarding_complete || false,
        isStripeActivateSubscriptionComplete: (state): boolean => state.user?.onboarding_status?.stripe_activate_subscription_complete || false,
        isStripeActivateConnectComplete: (state): boolean => state.user?.onboarding_status?.stripe_activate_connect_complete || false,
        isStripeProviderStatus: (state): string => state.user?.stripe_provider_status || 'not_started',
        onboardingStatus: (state): OnboardingStatus => state.user?.onboarding_status || {} as OnboardingStatus,
    },

    // 3. ACTIONS
    actions: {
        setUser(user: User | null) {
            this.user = user;
        },

        async register(payload: { email: string, password: string }): Promise<User> {
            try {
                const response = await axios.post('/auth/register', payload);
                await this.requestVerifyToken(payload.email);
                return response.data as User;
            } catch (e: any) {
                console.error('Registration failed:', e.response?.data?.detail || e.message);
                throw e;
            }
        },

        async verifyEmail(token: string): Promise<User> {
            try {
                const response = await axios.post('/auth/verify', {token});
                const {user, access_token} = response.data;
                localStorage.setItem('token', access_token);
                this.setUser(user);
                return user;
            } catch (e) {
                console.error('Email verification failed:', e);
                throw e;
            }
        },

        async requestVerifyToken(email: string): Promise<void> {
            try {
                await axios.post('/auth/request-verify-token', {email});
            } catch (e) {
                console.error('Failed to send verification email:', e);
                throw e;
            }
        },

        async resendVerificationEmail(): Promise<void> {
            if (!this.user?.email) throw new Error('User email not found in store.');
            await this.requestVerifyToken(this.user.email);
        },

        async requestPasswordReset(email: string): Promise<void> {
            try {
                await axios.post('/auth/forgot-password', {email});
            } catch (e) {
                console.error('Failed to request password reset:', e);
                throw e;
            }
        },

        async resetPassword({token, password}: { token: string, password: string }): Promise<any> {
            try {
                await axios.post('/auth/reset-password', {token, password});
                return {success: true, message: 'Password reset successful.'};
            } catch (error: any) {
                throw new Error(error.response?.data?.detail || error.message);
            }
        },

        async updateUserOnboardingStatus(payload: {
            is_provisional: boolean
            roles: string[]
            onboarding_status?: Partial<OnboardingStatus>
        }): Promise<User> {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Authentication required");
            try {
                const response = await axios.patch('users/me', payload, {
                    headers: {'Authorization': `Bearer ${token}`},
                });
                this.setUser(response.data);
                return response.data;
            } catch (error: any) {
                console.error("Failed to update user onboarding status:", error.response?.data?.detail || error.message);
                throw error;
            }
        },

        async completeProviderOnboarding(providerData: any): Promise<User> {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Authentication required");
            try {
                const response = await axios.post('/api/v1/user/onboarding/provider', providerData, {
                    headers: {'Authorization': `Bearer ${token}`},
                });
                this.setUser(response.data);
                return response.data;
            } catch (error) {
                console.error('Provider onboarding failed:', error);
                throw error;
            }
        },

        async completeBasicProfile(profileData: any): Promise<User> {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found.');
            try {
                const response = await axios.put('/api/v1/user/complete-basic-profile', profileData, {
                    headers: {'Authorization': `Bearer ${token}`},
                });
                this.setUser(response.data);
                return response.data;
            } catch (error: any) {
                console.error('completeBasicProfile failed:', error.response?.data || error.message);
                throw error;
            }
        },

        async activateStripeSubscription(): Promise<User> {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found.');
            try {
                const response = await axios.post('/api/v1/user/onboarding/activate-stripe-subscription', {}, {
                    headers: {'Authorization': `Bearer ${token}`},
                });
                this.setUser(response.data);
                return response.data;
            } catch (error: any) {
                console.error('Free Plan Activation setup failed:', error.response?.data || error.message);
                throw error;
            }
        },

        // async setProviderPending(): Promise<void> {
        //     const token = localStorage.getItem('token');
        //     await axios.patch('/api/v1/user/set-provider-pending', {stripe_provider_status: 'pending'}, {
        //         headers: {'Authorization': `Bearer ${token}`},
        //     });
        // },

        // This action replaces the old setProviderPending logic.
    async setFinalProviderStatus(): Promise<void> {
      try {
        // The endpoint should signal to the backend that the user has completed
        // the frontend flow and is ready to enter the verification queue.
        // The payload sends the explicit status 'pending_requirements'
        // which matches the next logical state after 'billing_setup_complete: true'.
        const response = await axios.patch('/api/v1/user/set-provider-status', {
          stripe_provider_status: 'pending_requirements',
        });

        // Assuming the backend returns the full updated user object or the new status in response.data
        if (this.user) {
          // It is safest to assume the backend returns the new status field, or the full user object.
          // We will use the status sent in the payload as a fallback if the full user is not returned.
          const newStatus = response.data?.stripe_provider_status || 'pending_requirements';
          this.user.stripe_provider_status = newStatus;

          // Optional: You might also want to update the onboarding_status if needed,
          // although the frontend check already confirms billing_setup_complete is true.
        }

        // Optional: Log success
        console.log('Provider status successfully transitioned to pending_requirements', response.data);

      } catch (error) {
        console.error('Failed to set final provider status:', error);
        // The component will catch and display this error
        throw error;
      }
    },

        async viewUser(): Promise<void> {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn("No token found - user not authenticated");
                return;
            }
            try {
                const response = await axios.get('users/me', {
                    headers: {'Authorization': `Bearer ${token}`},
                });
                this.setUser(response.data);
            } catch (error: any) {
                console.error("Failed to fetch user data:", error);
                if (error.response?.status === 401) this.clearUser();
                throw error;
            }
        },

        async verifyProviderStatus(): Promise<void> {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Authentication required.");
            try {
                const {data} = await axios.get('users/me/provider-status', {
                    headers: {'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache'},
                });
                if (!data.isActive) {
                    await this.viewUser();
                    throw new Error("Provider verification pending or inactive.");
                }
                await this.viewUser();
            } catch (error) {
                console.error("Provider verification failed:", error);
                await this.viewUser();
                throw error;
            }
        },

        async logIn(credentials: { email: string, password: string }): Promise<void> {
            try {
                const response = await axios.post(
                    'auth/jwt/login',
                    new URLSearchParams({username: credentials.email, password: credentials.password}),
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                );
                localStorage.setItem('token', response.data.access_token);
                await this.viewUser();
            } catch (error: any) {
                if (error.response?.data?.detail === "OAUTH_NEEDS_PASSWORD_SETUP") {
                    throw new Error("OAUTH_NEEDS_PASSWORD_SETUP");
                } else if (error.response?.status === 400) {
                    throw new Error("Invalid email or password.");
                } else {
                    throw error;
                }
            }
        },

        async googleLogin(): Promise<void> {
            try {
                const {data} = await axios.get('/auth/google/authorize');
                if (data.authorization_url) window.location.href = data.authorization_url;
                else throw new Error("No authorization URL received.");
            } catch (error) {
                console.error("Google login failed:", error);
                throw error;
            }
        },

        async facebookLogin(): Promise<void> {
            try {
                const {data} = await axios.get('auth/facebook/authorize');
                if (data.authorization_url) window.location.href = data.authorization_url;
                else throw new Error("No authorization URL received.");
            } catch (error) {
                console.error("Facebook login failed:", error);
                throw error;
            }
        },

        async deleteUser(id: string): Promise<void> {
            await axios.delete(`users/${id}`);
        },

        async logOut(): Promise<void> {
            const token = localStorage.getItem('token');
            try {
                if (token) {
                    await axios.post('auth/jwt/logout', {}, {
                        headers: {'Authorization': `Bearer ${token}`}, timeout: 3000
                    });
                }
            } catch (error) {
                console.warn("Logout API error (proceeding anyway):", error);
            } finally {
                this.clearUser();
            }
        },

        clearUser(): void {
            localStorage.removeItem('token');
            document.cookie = `onboarding_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            this.user = null;
        },
    },
});
