import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from './axiosConfig';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.css';
import Cookies from "js-cookie";

async function initializeCsrfToken() {
    try {
        let response = await axios.get('/api/csrf/');
        Cookies.set('csrftoken', response.data.token, { secure: true, sameSite: 'None' });
    } catch (error) {
        console.error('Error initializing CSRF token:', error);
    }
}

async function initializeApp() {
    await initializeCsrfToken();
    const app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.mount('#app');
}

initializeApp();




