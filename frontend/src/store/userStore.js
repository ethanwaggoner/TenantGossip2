import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        isLoading: false,
        error: null,
    }),
    getters: {
        isAuthenticated(state) {
            // Directly rely on the state value as cookies are HTTPOnly
            return state.isLoggedIn;
        }
    },
    actions: {
        async checkAuthentication() {
            this.isLoading = true;
            try {
                // The backend will validate the HTTPOnly cookie
                await this.refreshToken();
                await axios.get(`${API_BASE_URL}/api/verify-token/`, { withCredentials: true });
                this.isLoggedIn = true;
            } catch (error) {
                console.error('Authentication check failed:', error);
                this.isLoggedIn = false;
            } finally {
                this.isLoading = false;
            }
        },

        async login(email, password) {
            this.isLoading = true;
            try {
                // Login will set HTTPOnly cookies on successful authentication
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
                // Logout request to backend to clear HTTPOnly cookies
                await axios.post(`${API_BASE_URL}/api/logout/`, {}, { withCredentials: true });
            } catch (error) {
                console.error('Logout failed:', error);
            } finally {
                this.user = null;
                this.isLoggedIn = false;
                this.isLoading = false;
            }
        },

        async refreshToken() {
            this.isLoading = true;
            try {
                // The backend will handle the token refresh
                await axios.post(`${API_BASE_URL}/api/token/refresh/`, {}, { withCredentials: true });
                this.isLoggedIn = true;
            } catch (error) {
                console.error('Token refresh error:', error);
                await this.logout();
            } finally {
                this.isLoading = false;
            }
        },

        clearError() {
            this.error = null;
        }
    },
});
