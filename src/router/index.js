import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/HomeView.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('../components/EditView.vue')
    }
  ],
})

export default router
