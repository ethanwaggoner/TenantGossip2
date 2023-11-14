<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import router from "@/router"; // Adjust the path as necessary

const email = ref('');
const confirmEmail = ref('');
const password = ref('');
const confirmPassword = ref('');

const userStore = useUserStore();

const register = async () => {
  if (email.value !== confirmEmail.value) {
    alert("Emails do not match");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  await userStore.register({ email: email.value, password: password.value });
  if (userStore.isAuthenticated) {
    await router.push({name: 'Home'});
  }
}
</script>


<template>
  <div class="signup-container">
    <div class="signup-card">
      <h2>SignUp</h2>
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="input-group">
          <label for="confirmEmail">Confirm Email</label>
          <input type="email" id="confirmEmail" v-model="confirmEmail" required>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required>
        </div>
        <button type="submit" class="signup-button">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15vh;
}

.signup-card {
  padding: 20px;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  text-align: center;
  width: 350px;
  animation: fadeIn 0.6s ease-out;
}

h2 {
  color: white;
  margin-bottom: 20px;
  animation: slideDown 0.6s ease-out;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  color: #FFC107;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #4A00E0;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #8E2DE2;
}

.signup-button {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #FFC107;
  color: black;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.signup-button:hover {
  background-color: #e6b022;
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
