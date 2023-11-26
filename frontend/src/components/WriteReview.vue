<script setup>
import {computed, ref} from 'vue';
import { useReviewsStore } from '@/store/reviewsStore';

const title = ref('');
const content = ref('');
const stateId = ref(null);
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

const submitReview = async () => {
  if (!stateId.value || !title.value.trim() || !content.value.trim()) {
    alert("Please fill in all fields.");
    return;
  }

  await reviewsStore.postNewReview({
    state_id: stateId.value,
    title: title.value,
    content: content.value
  });

  title.value = '';
  content.value = '';
  stateId.value = null;
};
</script>

<template>
  <div class="review-container">
    <div class="review-card">
      <h2>Write a Review</h2>
      <p class="description">
        Welcome aboard TenantGossip – the ultimate hub for sharing and discovering real rental experiences.
        Dive into the heart of our community and let your voice be a guiding light.
        Share your personal tales, whether it's singing praises for a wonderful landlord or shedding light on less favorable property management experiences.
        Your insights are a treasure trove for fellow renters, helping them steer their rental journey wisely.
        Join us in our quest to build a transparent, informed, and empowered tenant community, one honest review at a time!
      </p>
      <form @submit.prevent="submitReview">
        <div class="input-group">
          <label for="state">State</label>
          <select id="state" v-model="stateId" required>
            <option value="" disabled>Select a State</option>
            <option v-for="state in sortedStates" :key="state.stateId" :value="state.stateId">{{ state.state }}</option>
          </select>
        </div>
        <div class="input-group">
          <label for="title">Title</label>
          <input type="text" id="title" v-model="title" required>
        </div>
        <div class="input-group">
          <label for="content">Review</label>
          <textarea id="content" v-model="content" rows="4" required></textarea>
        </div>
        <button type="submit" class="review-button">Submit Review</button>
      </form>
    </div>
  </div>
</template>


<style scoped>
.review-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh; /* Adjusted top margin */
}

.review-card {
  padding: 30px;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  text-align: center;
  width: 50vw;
  animation: fadeIn 0.6s ease-out;
}

.description {
  font-family: 'Open Sans', sans-serif;
  color: #FFF;
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: justify;
  padding: 0 40px;
}

.description span.highlight {
  color: #FFC107;
  font-weight: bold;
}

h2 {
  color: white;
  margin-bottom: 20px;
  animation: slideDown 0.6s ease-out;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
  animation: slideUp 0.6s ease-out;
}

label {
  display: block;
  color: #FFC107;
  margin-bottom: 5px;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #4A00E0;
  color: white;
  transition: border-color 0.3s, background-color 0.3s;
  cursor: pointer;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: center;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select:hover, select:focus {
  border-color: #8E2DE2;
  background: rgba(255, 255, 255, 0.3);
}

select option {
  color: white;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #4A00E0;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transition: border-color 0.3s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #8E2DE2;
}

.review-button {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #FFC107;
  color: black;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.review-button:hover {
  background-color: #e6b022;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
