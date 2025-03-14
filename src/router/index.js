import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Assessment from '../views/Assessment.vue'
import Results from '../views/Results.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/assessment',
      name: 'assessment',
      component: Assessment
    },
    {
      path: '/results',
      name: 'results',
      component: Results
    }
  ]
})

export default router