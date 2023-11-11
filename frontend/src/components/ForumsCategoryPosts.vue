<script setup>
import {computed, onMounted, watch} from 'vue';
import { useRoute } from 'vue-router';
import router from "@/router";
import { useForumsStore } from "@/store";

const route = useRoute();
const catId = computed(() => route.params.categoryId);
const forumsStore = useForumsStore();

const posts = computed(() => forumsStore.posts[catId.value] || []);

function navigateToPostDetails(PostId) {
  router.push({ name: "PostDetails", params: { postId: PostId, categoryId: catId.value } });
}

function fetchPosts() {
  forumsStore.fetchPosts(catId.value);
}

onMounted(fetchPosts);

watch(catId, (newVal, oldVal) => {
  if (newVal!== oldVal) {
    fetchPosts();
  }
})
</script>

<template>
<h2>Posts</h2>
<div class="container h-100">
  <div class="row justify-content-center">
      <div v-for="post in posts" :key="post.id" class="category-card mb-4" @click="navigateToPostDetails(post.id)">
         <div>
          <h5>{{ post.title }}</h5>
          <p>{{ post.body }}</p>
         </div>
        <div class="likes">
          <small> {{ post.like_count }} Likes</small>
        </div>
      </div>
  </div>
</div>
</template>

<style scoped>
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
}

.category-card:hover {
  transform: translateY(-5px) rotate(-1deg);
  box-shadow: 0 15px 25px rgba(0,0,0,0.3);
}

.likes {
  text-align: right;
}

h2 {
  text-align: center;
  color: white;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
}
h5 {
  font-weight: 700;
  font-size: 1.4rem;
  color: #FFFFFF;
  margin-bottom: 10px;
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

.category-card {
  animation: fadeIn 0.6s ease-out;
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
