import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

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
            try {
                await axios.get(`${API_BASE_URL}/api/verify-token/`, { withCredentials: true });
                this.isLoggedIn = true;
            } catch (error) {
                this.isLoggedIn = false;
            } finally {
                this.isLoading = false;
                this.authCheckComplete = true;
            }
        },

        async login(email, password) {
            this.isLoading = true;
            try {
                await axios.post(`${API_BASE_URL}/api/token/`, { email, password }, { withCredentials: true });
                this.isLoggedIn = true;
            } catch (error) {
                this.error = error.response.data;
                this.isLoggedIn = false;
            } finally {
                this.isLoading = false;
            }
        },

        async logout() {
            this.isLoading = true;
            try {
                await axios.post(`${API_BASE_URL}/api/logout/`, {}, { withCredentials: true });
            } catch (error) {
            } finally {
                this.user = null;
                this.isLoggedIn = false;
                this.isLoading = false;
            }
        },

        async refreshToken() {
            this.isLoading = true;
            try {
                await axios.post(`${API_BASE_URL}/api/token/refresh/`, {}, { withCredentials: true });
                this.isLoggedIn = true;
            } catch (error) {
                await this.logout();
            } finally {
                this.isLoading = false;
            }
        },

       setupInterceptors() {
            axios.interceptors.response.use(response => {
                return response;
            }, async (error) => {
                const originalRequest = error.config;
                if (originalRequest.url.includes('/api/token/refresh')) {
                    return Promise.reject(error);
                }
                if (error.response && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        await this.refreshToken();
                        return axios(originalRequest);
                    } catch (refreshError) {
                        await this.logout();
                        return Promise.reject(error);
                    }
                }
                return Promise.reject(error);
            });
        }
    },
});

