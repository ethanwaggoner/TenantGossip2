import { defineStore } from 'pinia';
import axios from '@/axiosConfig';
import router from "@/router";

export const useReviewsStore = defineStore('reviews', {
    state: () => ({
        reviews: [],
        isLoading: false,
        selectedStateId: null,
        error: null,
        pagination: {
            currentPage: 1,
            totalPages: 0,
            pageSize: 4,
            totalReviews: 0,
        }
    }),
    actions: {
        async fetchReviews({ page = 1, stateId = null }) {
            try {
                this.isLoading = true;
                let url = `/api/reviews/?page=${page}`;
                if (stateId) {
                    url += `&state_id=${stateId}`;
                }

                const response = await axios.get(url);
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

        async fetchAllReviews(page = 1) {
            this.selectedStateId = null;
            await this.fetchReviews({ page });
        },

        async fetchReviewsByState(stateId, page = 1) {
            this.selectedStateId = stateId;
            await this.fetchReviews({ stateId, page });
        },

         async postNewReview(reviewData) {
            try {
                this.isLoading = true;
                const response = await axios.post(`/api/reviews/`, reviewData);
                if (response.status === 201) {
                    await router.push('/read-reviews');
                };
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },
        async toggleLike(reviewId) {
            try {
                this.isLoading = true;
                const response = await axios.post(`/api/reviews/${reviewId}/toggle_like/`);
                if (response.status === 200) {
                    const updatedReview = response.data;
                    const index = this.reviews.findIndex(review => review.id === reviewId);
                    if (index !== -1) {
                        this.reviews[index] = updatedReview;
                    }
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },

        async deleteReview(reviewId) {
            this.error = null;
            try {
                const response = await axios.delete(`/api/reviews/${reviewId}`);
                if (response.status === 200) {
                    this.reviews = this.reviews.filter(review => review.id !== reviewId);
                }
            } catch (error) {
                this.error = error.response ? error.response.data : 'Delete failed';
            }
        },

    },
});