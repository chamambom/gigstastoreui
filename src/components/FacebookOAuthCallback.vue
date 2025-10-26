<template>
<!--  <div class="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex items-center justify-center p-4">-->
  <div class="min-h-screen flex items-center justify-center p-4">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- Main content card -->
    <div class="relative z-10 max-w-md w-full">
      <div class="card bg-base-100 shadow-2xl backdrop-blur-sm bg-opacity-95">
        <div class="card-body items-center text-center p-8">

          <!-- Success/Processing State -->
          <div v-if="!hasError" class="space-y-6">
            <!-- Facebook Logo with animated border -->
            <div class="relative">
              <div class="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-orange-500 rounded-full p-0.5 animate-spin-slow">
                <div class="w-full h-full bg-base-100 rounded-full flex items-center justify-center">
                  <!-- Facebook f icon -->
                  <svg class="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Loading animation -->
            <div class="flex justify-center">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full animate-bounce delay-100"></div>
                <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>

            <!-- Status text -->
            <div class="space-y-2">
              <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                Connecting to Facebook
              </h2>
              <p class="text-base-content/70 text-sm">
                Authenticating with Facebook...
              </p>
              <p class="text-base-content/50 text-xs">
                Verifying your account credentials
              </p>
            </div>

            <!-- Animated progress indicators -->
            <div class="space-y-3">
              <!-- Progress bar -->
              <div class="w-full bg-base-300 rounded-full h-1.5 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-purple-500 to-orange-500 rounded-full animate-progress"></div>
              </div>

              <!-- Status steps -->
              <div class="flex justify-center space-x-4 text-xs">
                <div class="flex items-center space-x-1 text-blue-500">
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Connecting</span>
                </div>
                <div class="flex items-center space-x-1 text-base-content/40">
                  <div class="w-2 h-2 bg-base-content/20 rounded-full"></div>
                  <span>Verifying</span>
                </div>
                <div class="flex items-center space-x-1 text-base-content/40">
                  <div class="w-2 h-2 bg-base-content/20 rounded-full"></div>
                  <span>Complete</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Error State -->
          <div v-else class="space-y-6">
            <!-- Error icon with Facebook colors -->
            <div class="w-16 h-16 mx-auto bg-error/10 rounded-full flex items-center justify-center relative">
              <svg class="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 19.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <!-- Small Facebook icon in corner -->
              <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-base-100 rounded-full flex items-center justify-center border-2 border-base-300">
                <svg class="w-3 h-3" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
            </div>

            <!-- Error text -->
            <div class="space-y-2">
              <h2 class="text-2xl font-bold text-error">
                Facebook Authentication Failed
              </h2>
              <p class="text-base-content/70 text-sm">
                Unable to complete Facebook sign-in process
              </p>
              <p class="text-base-content/50 text-xs">
                This could be due to a cancelled login or network issue
              </p>
            </div>

            <!-- Error details -->
            <div class="bg-error/5 rounded-lg p-4 border border-error/20">
              <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-error mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="text-left">
                  <p class="text-sm font-medium text-error">Common causes:</p>
                  <ul class="text-xs text-base-content/60 mt-1 space-y-1">
                    <li>• Login process was cancelled</li>
                    <li>• Network connectivity issues</li>
                    <li>• Facebook permissions denied</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="flex flex-col space-y-3">
              <button
                class="btn btn-primary bg-gradient-to-r from-purple-600 to-orange-600 border-0 hover:from-purple-700 hover:to-orange-700 text-white"
                @click="$router.push('/login')"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Try Again
              </button>

              <button
                class="btn btn-ghost btn-sm text-base-content/60 hover:text-base-content"
                @click="$router.push('/login')"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Login
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Security and branding note -->
      <div class="mt-4 text-center space-y-2">
        <p class="text-xs text-base-content/40 flex items-center justify-center space-x-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          <span>Secure Facebook authentication</span>
        </p>
        <p class="text-xs text-base-content/30">
          Powered by Facebook Login • OAuth 2.0
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { handleOAuthRedirect } from '@/composables/oauthRedirectHandler.ts';

const route = useRoute();
const isProcessing = ref(true);
const hasError = ref(false);

onMounted(async () => {
  const { code, state } = route.query;

  if (code && state) {
    try {
      await handleOAuthRedirect('facebook', route, code, state);
    } catch (error) {
      console.error('OAuth redirect failed:', error);
      hasError.value = true;
    } finally {
      isProcessing.value = false;
    }
  } else {
    // Fallback if code or state are missing
    console.error('Missing code or state in query');
    hasError.value = true;
    isProcessing.value = false;
  }
});
</script>



<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.animate-progress {
  animation: progress 2s ease-in-out infinite;
}

/* Enhanced pulse animation */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Bounce animation delays */
.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-500 {
  animation-delay: 0.5s;
}

.delay-1000 {
  animation-delay: 1s;
}
</style>