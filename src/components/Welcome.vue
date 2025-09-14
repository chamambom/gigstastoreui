<script setup>
// No need for ref since we removed the counter
</script>

<template>
  <!-- Welcome Header -->
  <div class="welcome-header">
    <h1>Welcome to Gigsta Marketplace</h1>
    <p class="subtitle">Your platform for connecting service providers with customers</p>
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
        <p>We understand that many service providers like hairdressers, beauticians, and wellness professionals often have products they want to sell alongside their services. That's why we've partnered with AfriMall to offer you a complete business solution.</p>
      </div>

      <div class="feature">
        <h3>Why Sell Products Online?</h3>
        <ul>
          <li><strong>Increase Revenue Streams:</strong> Generate additional income from product sales</li>
          <li><strong>Complement Your Services:</strong> Offer products that enhance your service offerings</li>
          <li><strong>Build Customer Loyalty:</strong> Provide complete solutions to keep customers coming back</li>
          <li><strong>Professional Online Presence:</strong> Showcase your products with professional listings</li>
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
      <div class="provider-types">
        <div class="provider-type">
          <span class="emoji">💇</span>
          <span>Hair Stylists</span>
        </div>
        <div class="provider-type">
          <span class="emoji">💅</span>
          <span>Beauty Therapists</span>
        </div>
        <div class="provider-type">
          <span class="emoji">🧘</span>
          <span>Wellness Coaches</span>
        </div>
        <div class="provider-type">
          <span class="emoji">🏠</span>
          <span>Home Services</span>
        </div>
      </div>
    </div>

    <div class="next-steps">
      <h3>What's Next?</h3>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>Visit AfriMall.co.nz</h4>
            <p>Explore the platform that will power your online store</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>Prepare Your Products</h4>
            <p>Get your product information and images ready</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>Stay Tuned</h4>
            <p>We'll notify you as soon as the integration is complete</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.welcome-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #5a677d;
  font-size: 1.1rem;
}

.coming-soon-section {
  margin: 2rem 0;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f8f9fa;
  border-left: 4px solid #42b883;
}

.coming-soon-section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.coming-soon-text {
  color: #5a677d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.feature h3 {
  color: #42b883;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.feature ul {
  padding-left: 1.5rem;
}

.feature li {
  margin-bottom: 0.8rem;
  color: #5a677d;
  line-height: 1.5;
}

.integration-status {
  margin: 2rem 0;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.integration-status h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
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
  padding: 1rem;
  background: #f1f8ff;
  border-radius: 8px;
}

.status-label {
  font-weight: 500;
  color: #2c3e50;
}

.status-value.coming-soon {
  color: #ff7e29;
  font-weight: 600;
  padding: 0.4rem 1rem;
  background: #fff4ec;
  border-radius: 20px;
  font-size: 0.9rem;
}

.perfect-for {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #e8f5e9;
  border-radius: 8px;
  border-left: 4px solid #4caf50;
}

.perfect-for h3 {
  color: #2e7d32;
  margin-bottom: 1rem;
  text-align: center;
}

.provider-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.provider-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.emoji {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.next-steps {
  margin: 2rem 0;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.next-steps h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.step-content p {
  color: #5a677d;
  margin: 0;
  font-size: 0.9rem;
}
</style>