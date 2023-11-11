<script setup>
import ForumsCategories from "@/components/ForumsCategories.vue";
</script>

<template>
  <div class="container col-8">
    <div class="row">
      <div class="col-4 categories">
        <ForumsCategories />
      </div>
      <div class="col-8">
        <router-view />
      </div>
    </div>
  </div>
</template>
<style>

</style>
