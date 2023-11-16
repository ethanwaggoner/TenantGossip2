<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  states: Array
});

const emit = defineEmits(['stateSelected']);

const selectState = (stateId) => {
  emit('stateSelected', stateId);
}

</script>

<template>
  <h2>State Selection</h2>1
  <div class="state-sidebar h-25">
    <ul>
      <li @click="selectState(null)">All</li>
      <li v-for="state in states" :key="state.stateId" @click="selectState(state.stateId)">
        {{ state.state }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.state-sidebar {
  color: white;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  border-radius: 10px;
  height: 75vh;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  overflow-y: auto;
}


.state-sidebar ul {
  list-style-type: none;
  padding: 0;
}

.state-sidebar li {
  cursor: pointer;
  margin-bottom: 10px;
  transition: transform 0.2s ease, color 0.2s ease;
}

.state-sidebar li:hover {
  transform: translateX(5px);
  color: #4A00E0;
}

h2 {
  color: white;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  border-radius: 10px;
  padding: 20px;
}
</style>
