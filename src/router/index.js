import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import store from '@/store';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';

const routes = [
  {
    path: '/',
    meta: { requiresAuthenticated: true },
    component: HomeView
  },
  {
    path: '/login',
    meta: { requiresUnauthenticated: true },
    component: LoginView
  },
  {
    path: '/passwd',
    meta: { requiresAuthenticated: true },
    component: () => import('../views/ChangePasswordView.vue')
  },
  {
    path: '/:notFound(.*)*',
    meta: { requiresAuthenticated: true },
    component: () => import('../views/NotFoundView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();

  if (to.meta.requiresAuthenticated && !store.getters['auth/isLoggedIn']) {
    // 访问受保护的页面，但未登录则跳转至登录页
    next('/login');
  } else if (to.meta.requiresUnauthenticated && store.getters['auth/isLoggedIn']) {
    // 访问无需登录的页面，但已登录则跳转至首页
    next('/');
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
