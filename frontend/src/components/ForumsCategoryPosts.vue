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
<div class="container h-75">
  <div class="row justify-content-center">
      <div v-for="post in posts" :key="post.id" class="category-card mb-4" @click="navigateToPostDetails(post.id)">
         <div>
          <h5>{{ post.title }}</h5>
          <p>{{ post.body }}</p>
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
  padding: 20px;
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
</style>
