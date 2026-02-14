import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import PlayerPage from './components/PlayerPage.vue'
import PlayerPageVariant from './components/PlayerPageVariant.vue'

const routes = [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/r/:subreddit',
    component: PlayerPage,
  },
  {
    path: '/r/:subreddit/variant',
    component: PlayerPageVariant,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
