<script setup>

</script>

<template>
<div class="container">
  <h1>Terms and Conditions</h1>

  <p>By using the Tenant Gossip website and services, you agree to the following terms and conditions:</p>

  <h2>Reviews and Forum Conduct</h2>

  <ul>
    <li>Reviews and forum posts must be based on first-hand experiences with a landlord or property. Do not post hearsay or rumors.</li>

    <li>Keep reviews and discussions civil. Do not use profane, offensive, or discriminatory language. Any hate speech will be removed.</li>

    <li>Do not threaten or incite harm against others. Comments intended to harass or intimidate will not be tolerated.</li>

    <li>Do not post private contact information or addresses without permission. Always respect others' privacy.</li>

    <li>We reserve the right to remove any review or post deemed inappropriate or that violates site rules.</li>
  </ul>

  <h2>Liability</h2>

  <ul>
    <li>Tenant Gossip is not liable for any interactions between users occurring offline or independently of our website. We do not endorse or investigate users.</li>

    <li>Opinions expressed on Tenant Gossip are solely those of individual users. Reviews and forum posts do not represent the views of Tenant Gossip.</li>

    <li>Users are legally responsible for their own content. Do not post anything defamatory, libelous, offensive, or illegal.</li>
  </ul>

  <h2>Intellectual Property</h2>

  <ul>
    <li>All content posted remains the intellectual property of the original author. Do not plagiarize or copy others' work.</li>

    <li>By posting on Tenant Gossip, you grant us a non-exclusive license to display your content. We reserve the right to modify or remove content when necessary.</li>
  </ul>

  <p>Violating these terms can lead to account suspension or banning at our discretion. Please contact us if you have any questions.</p>

  <div class="buttons">
    <router-link to="/" style="text-decoration: none; color: inherit;">
      <div class="back-button">Back</div>
    </router-link>
    <router-link to="/forums" style="text-decoration: none; color: inherit;">
      <div class="agree-button">Agree</div>
    </router-link>
  </div>
</div>
</template>

<style scoped>
.container {
  color: white;
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  overflow-y: auto;
  transition: all 0.3s ease;
  animation: fadein 0.3s ease;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.back-button, .agree-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 20px;
  padding: 15px 20px;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.back-button:hover, .agree-button:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #FFC107;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>