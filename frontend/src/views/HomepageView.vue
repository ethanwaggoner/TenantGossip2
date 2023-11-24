<script setup>
import SemiCircle from "@/components/SemiCircle.vue";
import HomepageSummary from "@/components/HomepageSummary.vue";

</script>

<template>
  <div class="container">
    <SemiCircle />
    <img class="logo" src="src/assets/logo2.png" alt="logo">
  </div>
  <HomepageSummary />

</template>

<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px; /* Adjust as needed */
  overflow: hidden; /* Ensures no overflow from child elements */
  /* Remove or adjust the following line according to your page's background */
  background-color: transparent; /* Set to transparent or match with page background */
}

/* ... rest of your styles ... */


img.logo {
  border-radius: 10px;
  border: 3px solid white;
  position: absolute; /* Positioned over the semi-circle */
  height: 250px;
  width: auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Adds depth */
  transform: scale(1);
  transition: transform 0.3s ease;
  z-index: 2; /* Ensures logo is above the semi-circle */
}

img.logo:hover {
  transform: scale(1.05); /* Slight zoom on hover */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    height: auto;
  }

  img.logo {
    height: 150px; /* Smaller logo on smaller screens */
  }
}

</style>