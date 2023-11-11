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
        async fetchPosts(categoryId) {
            try {
                this.isLoading = true;
                if (!this.posts[categoryId]) {
                    const response = await fetch(`http://127.0.0.1:8000/api/posts/?category_id=${categoryId}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const postsData = await response.json();
                    this.$patch(state => {
                        state.posts[categoryId] = postsData
                    });
                }
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