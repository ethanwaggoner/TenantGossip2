<script setup>
import {useReviewsStore} from "@/store/reviewsStore";
import {useUserStore} from "@/store/userStore";

const props = defineProps({
  reviews: Array,
  pagination: Object,
  states: Array
});

const emit = defineEmits(['changePage']);
const reviewsStore = useReviewsStore();
const userStore = useUserStore();

const emitChangePage = (page) => {
  if (reviewsStore.selectedStateId) {
    reviewsStore.fetchReviewsByState(reviewsStore.selectedStateId, page);
  } else {
    reviewsStore.fetchAllReviews(page);
  }
}

const findStateNameById = (stateId) => {
  const matchingState = props.states.find(s => s.stateId ===stateId);
  return matchingState ? matchingState.state : 'Unknown';
}

const toggleLike = async (review) => {
  if (userStore.isAuthenticated) {
    await reviewsStore.toggleLike(review.id);
  }
};

const isAuthor = (review) => {
  console.log("userStore:" + userStore.user);
  console.log("reviewAuthor" + review.author_random_username);
  return userStore.isAuthenticated && userStore.user === review.author_random_username;
};

const deleteReview = async (reviewId) => {
  if (confirm('Are you sure you want to delete this review?')) {
    await reviewsStore.deleteReview(reviewId)
    emitChangePage(reviewsStore.pagination.currentPage);
}

}

</script>

<template>
  <div class="reviews-list col-8 w-100 h-75">
    <div v-for="review in reviews" :key="review.id" class="review-card w-100">
      <span v-if="isAuthor(review)">
        <i class="fa fa-trash" @click="deleteReview(review.id)"></i>
      </span>
      <h3>{{ review.title }}</h3>
      <p>{{ review.content }}</p>
      <div class="review-details">
        <span>State: {{ findStateNameById(review.state_id) }}</span>
        <span>Posted on: {{ new Date(review.created_at).toLocaleDateString() }}</span>
        <span>Author: {{ review.author_random_username }}</span>
        <span class="likes">
          <i :class="{'fa': true, 'fa-heart': true, 'liked': review.isLiked}" @click="toggleLike(review)"></i>
          <span>{{ review.num_likes }}</span>
        </span>
      </div>
    </div>
    <div class="pagination-controls">
      <button @click="emitChangePage(pagination.currentPage - 1)"
              :disabled="pagination.currentPage === 1">
        Previous
      </button>
      <button @click="emitChangePage(pagination.currentPage + 1)"
              :disabled="pagination.currentPage === pagination.totalPages">
        Next
      </button>
    </div>
  </div>
</template>


<style scoped>
.reviews-list {
  display: block;
  width: 100%;
}

.review-card {
  position: relative;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.review-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.35);
}

.review-card h3 {
  margin-top: 0;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-controls button {
  background: #4A00E0;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.pagination-controls button:hover {
  background: #8E2DE2;
}

.pagination-controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.review-details {
  color: white;
  font-size: 0.8em;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.review-details span {
  display: inline-block;
  margin-bottom: 5px;
}

.fa-heart {
  color: #e25555;
  cursor: pointer;
  margin-right: 5px;
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

.fa-trash {
  position: absolute;
  top: 10px;
  right: 30px;
  color: #ff6b6b;
  cursor: pointer;
  margin-left: 10px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.fa-trash:hover {
  color: #ff3b3b;
  transform: scale(1.1);
}

@keyframes heartBounce {
  0%, 100% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1.4);
  }
}
</style>
