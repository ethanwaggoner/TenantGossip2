<script setup>
import NavBarTop from "@/components/NavBarTop.vue";
import {onMounted} from "vue";
import {useUserStore} from "@/store/userStore";

onMounted(async () => {
  const userStore = useUserStore();
  await userStore.checkAuthentication();
});
</script>

<template>
  <NavBarTop />
  <router-view />
</template>

