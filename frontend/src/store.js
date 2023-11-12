import { defineStore } from 'pinia'

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
                const response = await fetch("http://127.0.0.1:8000/api/categories/?format=json");
                if (!response.ok) throw new Error('Network response was not ok');
                this.categories = await response.json();
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },
         async fetchPosts(categoryId, page = 1) {
            try {
                this.isLoading = true;
                const url = `http://127.0.0.1:8000/api/posts/?category_id=${categoryId}&page=${page}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                this.$patch(state => {
                    state.posts[categoryId] = data.results;
                    state.pagination = {
                        currentPage: page,
                        totalPages: Math.ceil(data.count / state.pagination.pageSize),
                        pageSize: state.pagination.pageSize,
                        totalItems: data.count
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
                    const response = await fetch(`http://127.0.0.1:8000/api/posts/${postId}/category/${this.currentCategoryID}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const postDetailsData = await response.json();
                    this.$patch(state => {
                        state.postDetails[postId] = postDetailsData;
                    });
                }
                this.currentPostID = postId;
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        }
    },
});