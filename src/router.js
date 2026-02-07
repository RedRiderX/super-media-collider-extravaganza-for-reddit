import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import PlayerPage from './components/PlayerPage.vue'

const routes = [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/r/:subreddit',
    component: PlayerPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
