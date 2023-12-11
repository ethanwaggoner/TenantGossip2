<script setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from "@/router";
import { useForumsStore } from "@/store/forumsStore";

const route = useRoute();
const catId = computed(() => route.params.categoryId);
const forumsStore = useForumsStore();
const currentPage = ref(1);

const posts = computed(() => forumsStore.posts[catId.value] || []);
const totalPages = computed(() => forumsStore.pagination.totalPages);

const showNewPostModal = ref(false);
const newPostTitle = ref('');
const newPostBody = ref('');

const createNewPost = async () => {
  if (newPostTitle.value && newPostBody.value) {
    await forumsStore.createPost({
      title: newPostTitle.value,
      body: newPostBody.value,
      category: catId.value,
    });
    showNewPostModal.value = false;
    newPostTitle.value = '';
    newPostBody.value = '';
    fetchPosts();
  } else {
    alert('Please fill in all fields.');
  }
};

function navigateToPostDetails(postId) {
  router.push({ name: "PostDetails", params: { postId, categoryId: catId.value } });
}

function fetchPosts(page = 1) {
  forumsStore.fetchPosts(catId.value, page);
  currentPage.value = page;
}

function goToNextPage() {
  if (currentPage.value < totalPages.value) {
    fetchPosts(currentPage.value + 1);
  }
}

function goToPreviousPage() {
  if (currentPage.value > 1) {
    fetchPosts(currentPage.value - 1);
  }
}

const togglePostLike = async (post) => {
  await forumsStore.togglePostLike(post.id);
}

onMounted(() => fetchPosts(currentPage.value));

watch(catId, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    fetchPosts(1);
  }
});
</script>

<template>
<h2>Posts</h2>
<div class="container h-100">
  <button class="new-post-btn" @click="showNewPostModal = true">
    <i class="fa fa-plus"></i>
  </button>
  <transition name="fade">
  <div v-if="showNewPostModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showNewPostModal = false">&times;</span>
        <h3>Create New Post</h3>
        <input v-model="newPostTitle" type="text" placeholder="Post Title" />
        <textarea v-model="newPostBody" placeholder="Post Content"></textarea>
        <button @click="createNewPost">Post</button>
      </div>
  </div>
  </transition>
  <div class="row justify-content-center">
    <div v-for="post in posts" :key="post.id" class="category-card mb-4" @click.stop="navigateToPostDetails(post.id)">
      <div>
        <h5>{{ post.title }}</h5>
        <p>{{ post.body }}</p>
      </div>
      <div class="likes">
        <small>{{ post.comments_count }} Comments</small>
        <i class="fa fa-heart" @click.stop="togglePostLike(post)"></i>
        <span> {{ post.like_count }} </span>
      </div>
    </div>
  </div>
</div>
<div class="pagination">
  <button @click="goToPreviousPage" :disabled="currentPage === 1">Previous</button>
  <span>Page {{ currentPage }} of {{ totalPages }}</span>
  <button @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
</div>
</template>

<style scoped>
.container {
  max-height: 75vh;
  overflow-y: auto;
  padding: 20px;
}



.new-post-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4A00E0;
  border: none;
  border-radius: 50%;
  color: white;
  padding: 15px;
  font-size: 40px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: popIn 0.6s ease-out;
}

.new-post-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 500px;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  transform: translateY(-20px);
}

.close {
  float: right;
  font-size: 28px;
  cursor: pointer;
}

.modal input, .modal textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.modal button {
  background-color: #4A00E0;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
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
}

.category-card:hover {
  transform: translateY(-5px) rotate(-1deg);
  box-shadow: 0 15px 25px rgba(0,0,0,0.3);
  cursor: pointer;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #4A00E0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: grey;
  cursor: default;
}

.pagination span {
  margin: 0 10px;
  color: white;
}

.fa-heart {
  color: #e25555;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 5px;
  transform: scale(1);
  transition: color 0.3s ease, transform 0.3s ease;
}

.fa-heart:hover, .fa-heart.liked {
  color: #cc4444;
  transform: scale(1.25);
}

.fa-heart.liked {
  animation: heartBounce 0.5s ease;
}

@keyframes heartBounce {
  0%, 100% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1.4);
  }
}

@keyframes popIn {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
