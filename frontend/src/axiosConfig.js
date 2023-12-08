
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://127.0.0.1:8000';


axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;


axios.interceptors.request.use((config) => {
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
});

axios.interceptors.response.use(response => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default axios;
