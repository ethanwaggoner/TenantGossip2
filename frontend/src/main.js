import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia }  from 'pinia'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/main.css'
import axios from "axios";

createApp(App).use(router).use(createPinia()).mount('#app')


