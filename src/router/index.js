import Vue from 'vue'
import VueRouter from 'vue-router'
import SettingsComponent from '../components/SharedComponents/SettingsComponent.vue'
import MainComponent from '../components/MainGame/MainComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    canReuse: false,
    component: SettingsComponent
  },
  {
    path: '/game',
    name: 'Game',
    canReuse: false,
    component: MainComponent
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
