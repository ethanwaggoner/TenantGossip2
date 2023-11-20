import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia }  from 'pinia'
import { useUserStore} from "@/store/userStore";

import 'bootstrap/dist/css/bootstrap.css'
import './assets/main.css'


createApp(App).use(router).use(createPinia()).mount('#app')

const userStore = useUserStore();
userStore.setupInterceptors();

