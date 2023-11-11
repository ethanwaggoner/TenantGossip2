<script setup>
import {computed, onMounted, watch} from 'vue';
import { useRoute } from 'vue-router';
import { useForumsStore } from "@/store";
import router from "@/router";

const route = useRoute();
const postId = computed(() => route.params.postId);
const forumsStore = useForumsStore();

const postDetails = computed(() => forumsStore.postDetails[postId.value] || {})
function navigateBack(catId) {
  router.push({name: "CategoryPosts", params: {categoryId: catId}});
}

function fetchPostDetails(postId) {
  forumsStore.fetchPostDetails(postId);
}

onMounted(() => {
  fetchPostDetails(postId.value);
});

watch(postId, (newVal) => {
  if (newVal) {
    fetchPostDetails(newVal);
  }
});

</script>

<template>

<div class="container h-75">
  <div class="back w-25" @click="navigateBack(postDetails.category.id)">
    Back
  </div>
  <div class="center">
    <h1>{{postDetails.title}}</h1>
    <p>{{postDetails.body}}</p>
  </div>
</div>
</template>

<style scoped>
.container {
  background: linear-gradient(180deg, #4FC0D0, #1B6B93);
  border: #1a1a1a 2px solid;
  color: white;
  margin-top: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
.center {
  justify-content: center;
}
.back {
  margin-top: 20px;
  justify-content: left;
  background: linear-gradient(to bottom, #4FC0D0, #1B6B93);
  color: antiquewhite;
  font-size: 24px;
  padding: 20px 20px 20px 20px;
  border-radius: 10px;
  border: #1a1a1a 2px solid;
}
</style>