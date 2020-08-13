import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/pages/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    canReuse: false,
    component: HomePage
  },
  {
    path: '/beginner',
    name: 'beginnerGame',
    canReuse: false,
    component: () => import('@/pages/BeginnerGame.vue')
  },
  {
    path: '/standard',
    name: 'standardGame',
    canReuse: false,
    component: () => import('@/pages/StandardGame.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@/pages/Help.vue')
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
