<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/Welcome.vue</code> to test HMR
    </p>
  </div>

  <!-- Coming Soon Section -->
  <div class="coming-soon-section">
    <h2>Expand Your Business - Coming Soon!</h2>
    <p class="coming-soon-text">
      We're excited to announce that soon you'll be able to sell your products
      alongside your services through our integration with <strong>AfriMall.co.nz</strong>.
    </p>

    <div class="features-grid">
      <div class="feature">
        <h3>Complete Business Solution</h3>
        <p>We understand that many service providers like hairdressers, beauticians, and wellness professionals often have products they want to sell alongside their services.</p>
      </div>

      <div class="feature">
        <h3>Why Sell Products Online?</h3>
        <ul>
          <li>Increase Revenue Streams</li>
          <li>Complement Your Services</li>
          <li>Build Customer Loyalty</li>
          <li>Professional Online Presence</li>
        </ul>
      </div>
    </div>

    <div class="integration-status">
      <h3>Integration Status</h3>
      <div class="status-items">
        <div class="status-item">
          <span class="status-label">Online Store:</span>
          <span class="status-value coming-soon">Coming Soon</span>
        </div>
        <div class="status-item">
          <span class="status-label">AfriMall Integration:</span>
          <span class="status-value coming-soon">Coming Soon</span>
        </div>
      </div>
    </div>

    <div class="perfect-for">
      <h3>Perfect for Service Providers</h3>
      <p>Hair Stylists, Beauty Therapists, Wellness Coaches, Home Services, and more!</p>
    </div>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.coming-soon-section {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  border-left: 4px solid #42b883;
}

.coming-soon-section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.coming-soon-text {
  color: #5a677d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.feature {
  padding: 1rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.feature h3 {
  color: #42b883;
  margin-bottom: 0.5rem;
}

.feature ul {
  padding-left: 1.5rem;
}

.feature li {
  margin-bottom: 0.5rem;
  color: #5a677d;
}

.integration-status {
  margin: 1.5rem 0;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.status-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #f1f8ff;
  border-radius: 4px;
}

.status-label {
  font-weight: 500;
  color: #2c3e50;
}

.status-value.coming-soon {
  color: #ff7e29;
  font-weight: 600;
  padding: 0.2rem 0.8rem;
  background: #fff4ec;
  border-radius: 12px;
  font-size: 0.9rem;
}

.perfect-for {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #e8f5e9;
  border-radius: 6px;
  border-left: 4px solid #4caf50;
}

.perfect-for h3 {
  color: #2e7d32;
  margin-bottom: 0.5rem;
}

.perfect-for p {
  color: #5a677d;
  margin: 0;
}
</style>