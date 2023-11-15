import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('user-token') || null,
        user: null,
        isLoggedIn: !!localStorage.getItem('user-token'),
        isLoading: false,
        error: null,
    }),
    getters: {
        isAuthenticated(state) {
            return state.token !== null && state.isLoggedIn;
        }
    },
    actions: {
        async register(userData) {
            try {
                this.isLoading = true;
                await axios.post(`${API_BASE_URL}/api/register/`, userData);
                // Optionally, log in the user directly after registration
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },
        async login(email, password) {
            try {
                this.isLoading = true;
                const response = await axios.post(`${API_BASE_URL}/token/`, {
                    email,
                    password,
                });
                this.token = response.data.access;
                this.isLoggedIn = true;
                localStorage.setItem('user-token', this.token);
            } catch (error) {
                this.error = error;
                this.isLoggedIn = false;
            } finally {
                this.isLoading = false;
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            this.isLoggedIn = false;
            localStorage.removeItem('user-token');
        },
        async refreshToken() {
            try {
                const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
                    refresh: this.token,
                });
                this.token = response.data.access;
            } catch (error) {
                console.error('Token refresh error:', error);
                this.logout();
            }
        },
        clearError() {
            this.error = null;
        }
    },
});
