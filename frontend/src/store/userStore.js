import { defineStore } from 'pinia';
import axios from '@/axiosConfig';
import Cookies from "js-cookie";

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
                await axios.get('/api/check-session/');
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
                await axios.post('/api/login/', { email, password });
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
                await axios.get('/api/logout/');
                this.isLoggedIn = false;
            } catch (error) {
                this.error = error.response ? error.response.data : 'Logout failed';
            } finally {
                this.isLoading = false;
            }
        }
    },
});
