import { defineStore } from 'pinia';
import axios from '@/axiosConfig';

export const useForumsStore = defineStore('forums', {
    state: () => ({
        categories: [],
        posts: {},
        currentCategoryID: null,
        currentPostID: null,
        postDetails: {},
        isLoading: false,
        error: null,
        pagination: {
            currentPage: 1,
            totalPages: 0,
            pageSize: 6,
            totalPosts: 0,
        }
    }),
    actions: {
        async fetchCategories() {
            try {
                this.isLoading = true;
                const response = await axios.get('/api/categories/?format=json');
                this.categories = response.data;
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },
        async fetchPosts(categoryId, page = 1) {
            try {
                this.isLoading = true;
                const response = await axios.get(`/api/posts/?category_id=${categoryId}&page=${page}`);
                this.$patch(state => {
                    state.posts[categoryId] = response.data.results;
                    state.pagination = {
                        currentPage: page,
                        totalPages: Math.ceil(response.data.count / state.pagination.pageSize),
                        pageSize: state.pagination.pageSize,
                        totalItems: response.data.count
                    };
                });
                this.currentCategoryID = categoryId;
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },
        async fetchPostDetails(postId) {
            try {
                this.isLoading = true;
                if (!this.postDetails[postId]) {
                    const response = await axios.get(`/api/posts/${postId}/category/${this.currentCategoryID}`);
                    this.$patch(state => {
                        state.postDetails[postId] = response.data;
                    });
                }
                this.currentPostID = postId;
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },
        clearError() {
            this.error = null;
        }
    },
});
