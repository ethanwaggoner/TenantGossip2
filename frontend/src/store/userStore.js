import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true


export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        isLoading: false,
        authCheckComplete: false,
        error: null,
    }),
    getters: {
        isAuthenticated(state) {
            return state.isLoggedIn;
        }
    },
    actions: {
        async checkAuthentication() {
            this.isLoading = true;
            this.error = null;
            try {
                this.isLoggedIn = true;
                await axios.get(`${API_BASE_URL}/api/check-session/`, { withCredentials: true });
                this.isLoggedIn = true;
            } catch (error) {
                this.error = error.response ? error.response.data : 'Session check failed';
                this.isLoggedIn = false;
            } finally {
                this.isLoading = false;
                this.authCheckComplete = true;
            }
        },

        async login(email, password) {
            if (!email || !password) {
                this.error = 'Email and password are required';
                return;
            }
            this.isLoading = true;
            this.error = null;
            try {
                await axios.get(`${API_BASE_URL}/api/csrf/`);
                await axios.post(`${API_BASE_URL}/api/login/`, { email, password }, { withCredentials: true });
                this.isLoggedIn = true;
            } catch (error) {
                this.error = error.response ? error.response.data : 'Login failed';
                this.isLoggedIn = false;
            } finally {
                this.isLoading = false;
            }
        },

        async logout() {
            this.isLoading = true;
            this.error = null;
            try {
                await axios.get(`${API_BASE_URL}/api/logout/`, {
                    withCredentials: true,
                },
                    );
                this.isLoggedIn = false;
            } catch (error) {
                this.error = error.response ? error.response.data : 'Logout failed';
            } finally {
                this.isLoading = false;
            }
        },

        setupInterceptors() {
            axios.interceptors.response.use(response => {
                return response;
            }, async (error) => {
                if (error.response && error.response.status === 401) {
                    this.error = 'Session expired. Please log in again.';
                    await this.logout();
                }
                return Promise.reject(error);
            });
        }
    },
});
