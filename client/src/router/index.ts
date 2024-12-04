import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AboutUs from '../pages/AboutUs.vue'

import TestComponent from '../components/UserProfile.vue'

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
      path: '/testing123',
      name: 'test page for testing components',
      component: TestComponent
    }
  ]
})

export default router
