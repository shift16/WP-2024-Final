import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import ActivityDashboard from '../pages/ActivityDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/activity',
      name: 'home',
      component: ActivityDashboard
    },
    {
      path: '/',
      name: 'login-page',
      component: LoginPage
    },
    {
      path: '/sign-up',
      name: 'sign-up-page',
      component: LoginPage
    }
  ]
})

export default router
