import { defineStore } from 'pinia';
import axios from 'axios';
import router from "@/router";

const API_BASE_URL = 'http://127.0.0.1:8000';

export const useReviewsStore = defineStore('reviews', {
    state: () => ({
        reviews: [],
        isLoading: false,
        error: null,
        pagination: {
            currentPage: 1,
            totalPages: 0,
            pageSize: 4,
            totalReviews: 0,
        }
    }),
    actions: {
        async fetchAllReviews(page = 1) {
            try {
                this.isLoading = true;
                const response = await axios.get(`${API_BASE_URL}/api/reviews/?page=${page}`);
                this.reviews = response.data.results;
                this.pagination = {
                    currentPage: page,
                    totalPages: response.data.total_pages,
                    pageSize: response.data.page_size,
                    totalReviews: response.data.count,
                };
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },
        async fetchReviewsByState(stateId, page = 1) {
            try {
                this.isLoading = true;
                const response = await axios.get(`${API_BASE_URL}/api/reviews/?state_id=${stateId}&page=${page}`);
                this.reviews = response.data.results;
                this.pagination = {
                    currentPage: page,
                    totalPages: response.data.total_pages,
                    pageSize: response.data.page_size,
                    totalReviews: response.data.count,
                };
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },
         async postNewReview(reviewData) {
            try {
                this.isLoading = true;
                const response = await axios.post(`${API_BASE_URL}/api/reviews/`, reviewData, {withCredentials: true});
                if (response.status === 201) {
                    await router.push('/read-reviews');
                };
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },
    }
});
