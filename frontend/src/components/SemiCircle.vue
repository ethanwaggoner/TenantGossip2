<script setup>

</script>

<template>
<div class="semi-circle"></div>
</template>

<style scoped>
.semi-circle {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 300px;
  border-radius: 0 0 250px 250px;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  border: none;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

</style>
