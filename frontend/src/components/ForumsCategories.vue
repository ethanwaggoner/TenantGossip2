<script setup>
import { ref, onMounted } from "vue";
import router from "@/router";
import { useForumsStore } from "@/store";

const forumsStore = useForumsStore();


function navigateToPosts(catId) {
  router.push({ name: "CategoryPosts", params: { categoryId: catId } });
}

onMounted(() => {
  forumsStore.fetchCategories();
});
</script>

<template>
<div class="container h-75">
  <div class="row">
      <div v-for="category in forumsStore.categories" :key="category.id" class="category-card mb-4" @click="navigateToPosts(category.id)">
         <div>
          <h5>⬤ {{ category.name }}</h5>
          <p>{{ category.description }}</p>
         </div>
      </div>
  </div>
</div>
</template>

<style scoped>
.category-card {
  background: linear-gradient(180deg, #4FC0D0, #1B6B93);
  border: #1a1a1a 2px solid;
  color: white;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: 0.3s;
}

.category-card:hover {
  background: linear-gradient(180deg, #1B6B93, #4FC0D0);
  transform: scale(1.02);
  box-shadow: 0 8px 12px rgba(0,0,0,0.3);
  cursor: pointer;
}

h5 {
  font-weight: bold;
}

.container {
  padding-top: 40px;
  overflow-y: scroll;
}
</style>1
