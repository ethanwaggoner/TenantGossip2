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
         async createPost(postData) {
            try {
                this.isLoading = true;

                const response = await axios.post('/api/posts/', postData);
                if (response.status === 201) {
                    const newPost = response.data;
                    if (this.posts[this.currentCategoryID]) {
                        this.posts[this.currentCategoryID].unshift(newPost);
                    } else {
                        this.$set(this.posts, this.currentCategoryID, [newPost]);
                    }
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },

        async createComment(commentData) {
             console.log("Sending comment data:", commentData);
            try {
                this.isLoading = true;
                const response = await axios.post('/api/comments/', {
                    body: commentData.body,
                    post: this.currentPostID,
                });
                if (response.status === 201) {
                    const newComment = response.data;
                    if (this.postDetails[this.currentPostID]) {
                        this.postDetails[this.currentPostID].comments.push(newComment);
                    }
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },

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
        },
        async togglePostLike(postId) {
            try {
                this.isLoading = true;
                const response = await axios.post(`/api/posts/${postId}/toggle_like/`);
                if (response.status === 200) {
                    this.postDetails[postId] = response.data;
                    const categoryPosts = this.posts[this.currentCategoryID];
                    const postIndex = categoryPosts.findIndex(post => post.id === postId);
                    if (postIndex !== -1) {
                        categoryPosts[postIndex] = response.data;
                    }
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        }
    }
});

