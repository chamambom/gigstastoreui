<template>
  <div class="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-6 text-center">
    <!-- Illustration -->
    <div class="relative">
      <div
        class="absolute inset-0 blur-3xl bg-[#0d6efd]/10 rounded-full w-72 h-72 mx-auto"
      ></div>
      <div
        class="relative flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-tr from-[#0d6efd] to-[rgb(255,152,67)] shadow-lg mb-8"
      >
        <span class="text-white text-5xl font-extrabold tracking-tight">🚧</span>
      </div>
    </div>

    <!-- Title -->
    <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
      Coming Soon
    </h1>

    <!-- Subtitle -->
    <p class="text-gray-600 text-lg max-w-xl mb-8">
      We’re working hard to bring you this feature. Stay tuned — it’ll be worth the wait!
    </p>

    <!-- Button -->
    <RouterLink
      to="/"
      class="btn bg-[rgb(255,152,67)] hover:bg-[rgb(255,152,67)]/90 text-white font-semibold rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      Back to Home
    </RouterLink>
  </div>
</template>

<script setup>
// no script logic needed for static page
</script>

<style scoped>
/* Smooth gradient backdrop behind the emoji */
</style>
