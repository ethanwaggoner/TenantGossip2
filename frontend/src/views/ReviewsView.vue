<script setup>
import { onMounted, computed, ref } from 'vue';
import { useReviewsStore } from '@/store/reviewsStore';
import ReviewsSidebar from '@/components/ReviewsSidebar.vue';
import ReviewsDisplay from '@/components/ReviewsDisplay.vue';

const reviewsStore = useReviewsStore();
const statesData = ref([
  { state: 'Alabama', stateId: 1 },
  { state: 'Alaska', stateId: 2 },
  { state: 'Arizona', stateId: 3 },
  { state: 'Arkansas', stateId: 4 },
  { state: 'California', stateId: 5 },
  { state: 'Colorado', stateId: 6 },
  { state: 'Connecticut', stateId: 7 },
  { state: 'Delaware', stateId: 8 },
  { state: 'Florida', stateId: 9 },
  { state: 'Georgia', stateId: 10 },
  { state: 'Hawaii', stateId: 11 },
  { state: 'Idaho', stateId: 12 },
  { state: 'Illinois', stateId: 13 },
  { state: 'Indiana', stateId: 14 },
  { state: 'Iowa', stateId: 15 },
  { state: 'Kansas', stateId: 16 },
  { state: 'Kentucky', stateId: 17 },
  { state: 'Louisiana', stateId: 18 },
  { state: 'Maine', stateId: 19 },
  { state: 'Maryland', stateId: 20 },
  { state: 'Massachusetts', stateId: 21 },
  { state: 'Michigan', stateId: 22 },
  { state: 'Minnesota', stateId: 23 },
  { state: 'Mississippi', stateId: 24 },
  { state: 'Missouri', stateId: 25 },
  { state: 'Montana', stateId: 26 },
  { state: 'Nebraska', stateId: 27 },
  { state: 'Nevada', stateId: 28 },
  { state: 'New Hampshire', stateId: 29 },
  { state: 'New Jersey', stateId: 30 },
  { state: 'New Mexico', stateId: 31 },
  { state: 'New York', stateId: 32 },
  { state: 'North Carolina', stateId: 33 },
  { state: 'North Dakota', stateId: 34 },
  { state: 'Ohio', stateId: 35 },
  { state: 'Oklahoma', stateId: 36 },
  { state: 'Oregon', stateId: 37 },
  { state: 'Pennsylvania', stateId: 38 },
  { state: 'Rhode Island', stateId: 39 },
  { state: 'South Carolina', stateId: 40 },
  { state: 'South Dakota', stateId: 41 },
  { state: 'Tennessee', stateId: 42 },
  { state: 'Texas', stateId: 43 },
  { state: 'Utah', stateId: 44 },
  { state: 'Vermont', stateId: 45 },
  { state: 'Virginia', stateId: 46 },
  { state: 'Washington', stateId: 47 },
  { state: 'West Virginia', stateId: 48 },
  { state: 'Wisconsin', stateId: 49 },
  { state: 'Wyoming', stateId: 50 }
]);

const sortedStates = computed(() => {
  return statesData.value.sort((a, b) => a.state.localeCompare(b.state))
});

onMounted(() => {
  reviewsStore.fetchAllReviews();
});

const fetchReviewsByState = (stateId) => {
  if (stateId === null) {
    reviewsStore.fetchAllReviews();
  } else {
    reviewsStore.fetchReviewsByState(stateId);
  }
};

const changePage = (page) => {
  reviewsStore.fetchAllReviews(page);
};
</script>

<template>
  <h2></h2>
  <div class="container col-12 w-100">
    <div class="reviews-page col-12">
      <div class="row">
        <div class=col-2>
          <ReviewsSidebar :states="sortedStates" @stateSelected="fetchReviewsByState" />
        </div>
        <div class=col-10>
          <ReviewsDisplay :states="sortedStates" :reviews="reviewsStore.reviews" :pagination="reviewsStore.pagination" @changePage="changePage" />
        </div>
      </div>
  </div>
</div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.reviews-page {
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   padding: 20px;
}

.row {
  width: 100%;
}

.col-2, .col-10 {
  padding: 15px;
}

.col-2 {
  flex: 0 0 20%;
}

.col-10 {
  flex: 0 0 80%;
}
</style>
