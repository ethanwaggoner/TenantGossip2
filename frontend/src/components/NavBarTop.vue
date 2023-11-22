<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/store/userStore';
import router from "@/router"; // Adjust the path as necessary

const userStore = useUserStore();

const isAuthenticated = computed(() => userStore.isAuthenticated);

const logout = async() => {
  await userStore.logout();
  await router.push({ name: 'Home' });
}
</script>


<template>
  <div class="container col-8">
    <nav>
      <div class="nav-links">
        <router-link to="/" class="nav-item">
          <h2>Home</h2>
        </router-link>
        <div class="divider"></div>
        <router-link to="/resources" class="nav-item">
          <h2>Tenant Resources</h2>
        </router-link>
        <div class="divider"></div>
        <router-link to="/read-reviews" class="nav-item">
          <h2>Read Reviews</h2>
        </router-link>
        <div class="divider"></div>
        <router-link to="/write-review" class="nav-item">
          <h2>Write a Review</h2>
        </router-link>
        <div class="divider"></div>
        <router-link to="/forums" class="nav-item">
          <h2>Forums</h2>
        </router-link>
        <div class="divider"></div>
        <router-link v-if="!isAuthenticated" to="/signup" class="nav-item">
          <h2>Signup</h2>
        </router-link>
        <div v-if="!isAuthenticated" class="divider"></div>
          <router-link v-if="!isAuthenticated" to="/login" class="nav-item">
            <h2>Login</h2>
          </router-link>
        <div v-else @click="logout" class="nav-item">
          <h2>Logout</h2>
        </div>
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
  align-items: center;
  width: 100%;
}

.nav-item {
  text-decoration: none;
  color: inherit;
  padding: 15px;
  display: flex;
  align-items: center;
}

.nav-item h2 {
  font-size: 20px;
  margin: 0;
  transition: color 0.3s;
  color: #FFFFFF;
}

.nav-item h2:hover {
  color: #FFC107;
  cursor: pointer;
}

.divider {
  border-left: 2px solid #FFFFFF;
  height: 20px;
  opacity: 0.5;
}
</style>

