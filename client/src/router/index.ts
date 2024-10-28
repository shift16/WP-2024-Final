import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import ActivityDashboard from '../pages/ActivityDashboard.vue'
import FriendsActivity from '@/pages/FriendsActivity.vue'
import SignupPage from '@/pages/SignupPage.vue'
import AddGoals from '@/pages/AddGoals.vue'
import AdminPage from '@/pages/AdminPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
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
      component: SignupPage
    },
    {
      path: '/friends',
      name: 'friends-activity-page',
      component: FriendsActivity
    },
    {
      path: '/goals',
      name: 'add-goals-page',
      component: AddGoals
    },
    {
      path: '/admin',
      name: 'admin-page',
      component: AdminPage
    }
  ]
})

export default router
