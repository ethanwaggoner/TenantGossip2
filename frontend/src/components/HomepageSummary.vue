<script setup>

</script>

<template>
  <div class="summary">
    <h1>Welcome to Tenant Gossip - your home for real renter reviews, discussions, and resources.</h1>

    <p>Our mission is to empower renters by providing a platform to learn from each other's experiences, connect over shared interests, and be aware of your rights.</p>

    <h2>At Tenant Gossip, you can:</h2>

    <ul>
      <li>Read and write authentic landlord reviews - Discover which property managers live up to their promises and which ones don't. Be an informed renter.</li>

      <li>Participate in community forums - Exchange tips for finding rentals, ask questions about leases, and commiserate over shared experiences with fellow renters.</li>

      <li>Access state-specific renter's resources - Get to know the laws that protect you based on your location. Take advantage of our compiled information on security deposits, maintenance requests, rent increases, and more.</li>
    </ul>

    <p>Renting can be confusing and frustrating, but you don't have to go it alone. Tenant Gossip aims to level the playing field by bringing renters together. We believe informed tenants can help keep landlords and property managers accountable.</p>

    <p>Our vision is a world where renters are valued, heard, and empowered. Join us and make your renting experience better.</p>
  </div>
</template>

<style scoped>
.summary {
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  width: 65%;
  height: 75%;
  margin: 10px auto;
  color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  font-weight: 700;
  padding: 40px;
  overflow-y: auto;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.summary h1, .summary h2 {
  color: #FFC107;
  margin-bottom: 20px;
}

.summary p, .summary ul {
  line-height: 1.6;
  margin-bottom: 20px;
}

.summary ul {
  list-style: inside;
}

</style>