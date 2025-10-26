<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Edit Profile Section -->
    <div>
      <section class="border rounded-lg p-6 shadow-md">
        <h5 class="text-xl font-semibold mb-4">Edit Profile</h5>
        <form @submit.prevent="submit" class="space-y-4">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="text"
              id="email"
              v-model="form.email"
              class="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>

          <!-- Submit and Cancel Buttons -->
          <div class="flex space-x-4">
            <button type="submit" class="btn btn-primary">Submit Changes</button>
            <router-link :to="{ name: 'User', params: { id: user.id } }" class="btn btn-secondary">
              Cancel
            </router-link>
          </div>
        </form>
      </section>
    </div>

    <!-- Message Section -->
    <div>
      <section class="border rounded-lg p-6 shadow-md">
        <p class="text-gray-700">
          "Good day X, I am interested in the service that you provide, kindly call me back so we can chat."
        </p>
        <div class="mt-4 flex flex-col space-y-2">
          <button class="btn btn-primary">Send Email</button>
          <button class="btn btn-secondary">Send SMS</button>
        </div>
      </section>
    </div>

    <!-- Placeholder Section -->
    <div>
      <section class="border rounded-lg p-6 shadow-md">
        <p class="text-gray-500">Placeholder content here...</p>
      </section>
    </div>
  </div>
</template>


<script setup>
import {ref, onMounted, computed} from 'vue';
import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router';

// Access Vuex store, route, and router
const store = useStore();
const route = useRoute();
const router = useRouter();

// Props
const id = route.params.id; // or use 'defineProps' if this is a prop
// Get user from store
const user = computed(() => store.getters.user);

// Reactive form object
const form = ref({
  // username: '',
  email: '',
  // isPremium: '',
});

// Methods
const submit = async () => {
  try {
    const userPayload = {
      id,
      form: form.value,
    };
    await store.dispatch('updateUser', userPayload);
    router.push({ name: 'User', params: { id: user.value.id } });
  } catch (error) {
    console.error(error);
  }
};

// Load user data and populate the form
const GetUser = () => {
  try {
    // Check if the user data exists in the store
    if (user.value) {
      // form.value.username = user.value.username;
      form.value.email = user.value.email;
      // form.value.isPremium = user.value.isPremium;
    } else {
      // Fallback: If the user data is not in the store, load it
      store.dispatch('viewUser', id);
    }
  } catch (error) {
    console.error(error);
    router.push('/profile');
  }
};

// Load user data when component is mounted
onMounted(GetUser);
</script>
