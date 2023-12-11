<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import { useRoute } from 'vue-router';
import { useForumsStore } from "@/store/forumsStore";
import router from "@/router";

const route = useRoute();
const postId = computed(() => route.params.postId);
const forumsStore = useForumsStore();
const newCommentBody = ref('');

function createComment() {
  if (newCommentBody.value.length > 200) {
    alert('Comment must be 200 characters or less.');
    return;
  }
  if (newCommentBody.value) {
    const commentData = {
      body: newCommentBody.value,
      post: postId.value,
    };
    forumsStore.createComment(commentData)
      .then(() => {
        newCommentBody.value = '';
        fetchPostDetails(postId.value);
      })
      .catch(error => {
        console.error("Error creating comment:", error);
      });
  } else {
    alert('Please enter a comment.');
  }
}

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
<h2>Post Details</h2>
<div class="container h-100">
  <div class="back w-25" @click="navigateBack(postDetails.category.id)">
  Back
  </div>
    <div class="center">
      <h1>{{ postDetails.title }}</h1>
      <p>{{ postDetails.body }}</p>
      <div class="comments-section w-100">
      <h3>Comments ({{ postDetails.comments_count }})</h3>


      <div class="comment-form">
      <textarea v-model="newCommentBody" placeholder="Write a comment..."></textarea>
      <button @click="createComment">Submit Comment</button>
      </div>

      <div class="comment" v-for="comment in postDetails.comments" :key="comment.id">
        <div class="comment-header">
          <span class="author">{{ comment.author }}</span>
          <span class="date">{{new Date(comment.created_at).toLocaleDateString() }}</span>
        </div>
        <p>{{ comment.body }}</p>
      </div>

    </div>
  </div>
</div>
</template>


<style scoped>
.container {
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
  animation: fadeIn 0.6s ease-out;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: fadeIn 0.6s ease-out;
}

.back {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  animation: fadeIn 0.6s ease-out;
}

.back:hover {
  background: rgba(255, 255, 255, 0.2);
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #FFFFFF;
}

h2 {
  text-align: center;
  color: white;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 40px;
}

p {
  font-size: 1rem;
  line-height: 1.6;
  color: #E6E6E6;
}

.comments-section {
  margin-top: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.comment {
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: #E6E6E6;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

h3 {
  color: #FFC107;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.comment-form {
  margin-bottom: 20px;
}

.comment-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.comment-form button {
  background-color: #4A00E0;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #AAA;
}

.author {
  font-weight: bold;
}

.date {
  font-style: italic;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>