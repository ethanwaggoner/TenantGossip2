<script setup>
import SemiCircle from "@/components/SemiCircle.vue";
import HomepageSummary from "@/components/HomepageSummary.vue";

</script>

<template>
  <div class="container">
    <SemiCircle />
    <img class="logo" src="/logo2.png" alt="logo">
  </div>
  <HomepageSummary />

</template>

<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
  overflow: hidden;

  background-color: transparent;
}

img.logo {
  border-radius: 10px;
  border: 3px solid white;
  position: absolute;
  height: 250px;
  width: auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform: scale(1);
  transition: transform 0.3s ease;
  z-index: 2;
}

img.logo:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .container {
    height: auto;
  }

  img.logo {
    height: 150px;
  }
}

</style>