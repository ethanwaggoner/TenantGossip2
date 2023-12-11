<script setup>
import { onMounted } from "vue";
import router from "@/router";
import { useForumsStore } from "@/store/forumsStore";

const forumsStore = useForumsStore();


function navigateToPosts(catId) {
  router.push({ name: "CategoryPosts", params: { categoryId: catId } });
}

onMounted(() => {
  forumsStore.fetchCategories();
});
</script>

<template>
<h2>Categories</h2>
<div class="container h-100">
  <div class="row">
      <div v-for="category in forumsStore.categories" :key="category.id" class="category-card mb-4" @click="navigateToPosts(category.id)">
         <div>
          <h5>⬤ {{ category.name }}</h5>
          <p>{{ category.description }}</p>
         </div>
        <div class="post-count">
          <small>Posts: {{ category.posts_count }}</small>
        </div>
      </div>
  </div>
</div>
</template>

<style scoped>
.container {
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
}

.category-card {
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  animation: fadeIn 0.6s ease-out;
}

.category-card:hover {
  transform: translateY(-5px) rotate(-1deg);
  box-shadow: 0 15px 25px rgba(0,0,0,0.3);
  cursor: pointer;
}

.post-count {
  text-align: right;
}

h5 {
  font-weight: 700;
  font-size: 1.4rem;
  color: #FFFFFF;
  margin-bottom: 10px;
}

h2 {
  text-align: center;
  color: white;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
  line-height: 1.6;
  color: #E6E6E6;
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: 1fr;
  }
  .category-card {
    padding: 15px;
  }
}

</style>
