import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import PlayerPage from './components/classic/PlayerPage.vue'
import { default as PlayerPageOverlay } from './components/overlay/PlayerPageVariant.vue'
import { default as PlayerPageTV } from './components/tvguide/PlayerPage.vue'

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
    path: '/r/:subreddit/overlay',
    component: PlayerPageOverlay,
  },
  {
    path: '/r/:subreddit/tv',
    component: PlayerPageTV,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
