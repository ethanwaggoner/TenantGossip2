import { createWebHistory, createRouter } from 'vue-router'

// Lazy load all route components
const HomepageView = () => import("@/views/HomepageView.vue");
const TermsView = () => import("@/views/TermsAgreementView.vue");
const ResourcesView = () => import("@/views/ResourcesView.vue");
const ForumsCategoriesView = () => import("@/views/ForumsCategoriesView.vue");
const ForumsCategoryPosts = () => import('@/components/ForumsCategoryPosts.vue');
const ForumsPostDetails = () => import('@/components/ForumsPostDetails.vue');
const NotFoundView = () => import('@/views/NotFoundView.vue');
const LoginView = () => import('@/views/LoginView.vue');
const SignUpView = () => import('@/views/SignUpView.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomepageView,
    meta: { title: 'Home Page' },
  },
  {
    path: '/terms',
    name: 'Terms',
    component: TermsView,
    meta: { title: 'Terms and Conditions' },
  },
  {
    path: '/resources',
    name: 'Resources',
    component: ResourcesView,
    meta: { title: 'Renter Resources' },
  },
  {
    path: '/forums',
    name: 'Forums',
    component: ForumsCategoriesView,
    meta: { title: 'Forums' },
    children: [
      {
        path: 'category/:categoryId',
        name: 'CategoryPosts',
        component: ForumsCategoryPosts,
        meta: { title: 'Forum Category Posts' },
      },
      {
        path: 'category/:categoryId/post/:postId',
        name: 'PostDetails',
        component: ForumsPostDetails,
        meta: { title: 'Forum Post Details' },
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Login' },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpView,
    meta: { title: 'Sign Up' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { title: 'Page Not Found' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Tenant Gossip';
  next();
});

export default router;
