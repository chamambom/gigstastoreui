<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-base-200">
    <div class="card shadow-xl bg-base-100 p-8 w-full max-w-md">
      <div v-if="loading" class="text-center">
        <span class="loading loading-spinner text-primary"></span>
        <p class="mt-4 text-base-content">Verifying your email…</p>
      </div>

      <div v-if="success" class="text-center">
        <h2 class="text-2xl font-bold text-success mb-2">Email Verified 🎉</h2>
        <p class="text-base-content">Redirecting you to onboarding…</p>
      </div>

      <div v-if="error" class="text-center">
        <h2 class="text-2xl font-bold text-error mb-2">Verification Failed</h2>
        <p class="text-base-content">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';

const loading = ref(true);
const success = ref(false);
const error = ref('');

const store = useStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const token = route.query.token;
  if (!token) {
    error.value = 'No verification token provided.';
    loading.value = false;
    return;
  }

  try {
    await store.dispatch('auth/verifyEmail', token);
    success.value = true;
    loading.value = false;

    setTimeout(() => {
      router.push('/onboarding/continue');
    }, 1500);
  } catch (e) {
    loading.value = false;
    error.value = e.response?.data?.detail || 'Invalid or expired verification link.';
  }
});
</script>
