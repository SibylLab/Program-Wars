import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/pages/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    canReuse: false,
    component: HomePage
  },
  {
    path: '/standard',
    name: 'Standard Game',
    canReuse: false,
    component: () => import('@/pages/StandardGame.vue')
  },
  {
    path: '/requirements',
    name: 'Choose Requirement',
    canReuse: false,
    component: () => import('@/pages/Requirements.vue')
  },
  {
    path: '/decks',
    name: 'Deck Setup',
    canReuse: false,
    component: () => import('@/pages/DeckSetup.vue')
  },
  {
    path: '/agile_game',
    name: 'Agile Game',
    canReuse: false,
    component: () => import('@/components/agileGame/Game.vue')
  },
  {
    path: '/beginner',
    name: 'Beginner Game',
    canReuse: false,
    component: () => import('@/pages/BeginnerGame.vue')
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
