<script setup>

</script>

<template>
  <div class="container col-8">
    <nav>
      <div class="nav-links">
        <router-link to="/" style="text-decoration: none; color: inherit;">
          <a><h2 href=#>Home</h2></a>
        </router-link>
        <div class="divider"></div>
        <router-link to="/resources" style="text-decoration: none; color: inherit;">
        <h2 href=#>Tenant Resources</h2>
        </router-link>
        <div class="divider"></div>
        <h2 href=#>Read Reviews</h2>
        <div class="divider"></div>
        <router-link to="/terms" style="text-decoration: none; color: inherit;">
          <h2>Forums</h2>
        </router-link>
        <div class="divider"></div>
        <router-link to="/terms" style="text-decoration: none; color: inherit;">
          <h2>Write a Review</h2>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
nav {
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  color: white;
  font-weight: 800;
  display: flex;
  padding: 10px;
  border-radius: 15px;
  margin: 20px 0;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.nav-links {
  display: flex;
  justify-content: center;
  width: 100%;
}

.nav-links h2, .nav-links router-link {
  padding: 15px;
  font-size: 20px;
  margin: 0;
  transition: color 0.3s;
  color: #FFFFFF;
}

.nav-links h2:hover, .nav-links router-link:hover {
  color: #FFC107;
  cursor: pointer;
}

.divider {
  border-right: 2px solid #FFFFFF;
  opacity: 0.5;
}

</style>