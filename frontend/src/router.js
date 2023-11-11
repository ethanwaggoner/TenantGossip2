import { createWebHistory, createRouter } from 'vue-router'

import HomepageView from "@/views/HomepageView.vue";
import TermsAgreementView from "@/views/TermsAgreementView.vue";
import ResourcesView from "@/views/ResourcesView.vue";
import ForumsCategoriesView from "@/views/ForumsCategoriesView.vue";


const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomepageView,
    },
    {
      path: '/terms',
      name: 'Terms',
      component: TermsAgreementView,
    },
    {
      path: '/resources',
      name: 'Resources',
      component: ResourcesView,
    },
    {
      path: '/forums',
      name: 'Forums',
      component: ForumsCategoriesView,
      children: [
        {
          path: 'category/:categoryId',
          name: 'CategoryPosts',
          component: () => import('@/components/ForumsCategoryPosts.vue'),
        },
        {
          path: 'category/:categoryId/post/:postId',
          name: 'PostDetails',
          component: () => import('@/components/ForumsPostDetails.vue'),
        },
      ]
    },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router