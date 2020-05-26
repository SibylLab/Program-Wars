import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '@/components/landingPage/LandingPage'
import Game from '@/components/game/Game'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    canReuse: false,
    component: LandingPage
  },
  {
    path: '/game',
    name: 'Game',
    canReuse: false,
    component: Game
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
