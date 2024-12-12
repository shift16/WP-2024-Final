import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AboutUs from '../pages/AboutUs.vue'
import YourFitness from '../pages/YourFitness.vue'
import LoginPage from '../pages/LoginPage.vue'
import FriendsActivity from '../pages/FriendsActivity.vue'
import AdminView from '../pages/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about page',
      component: AboutUs
    },
    {
      path: '/your-fitness',
      name: 'fitness tracker page',
      component: YourFitness
    },
    {
      path: '/login',
      name: 'login and sign up page',
      component: LoginPage
    },
    {
      path: '/friends',
      name: 'friends page',
      component: FriendsActivity
    },
    {
      path: '/admin',
      name: 'admin page',
      component: AdminView
    }
  ]
})

export default router
