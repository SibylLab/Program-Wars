/**
 * Vue router that holds the page paths and what components to use for them.
 *
 * To change pages use `router.push('pagepath')`.
 * 
 * Using `component: () => import('@/pages/BeginnerGame.vue')` will allow
 * webpack to split up the code so that the pages information will not need to
 * be loaded until the page is used. This can increase the initial load times
 * for the site as we don't have to load everything at once.
 *
 * See {@link https://router.vuejs.org/} for more information on how to use
 * the router.
 *
 * @module router
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/pages/Home.vue'

Vue.use(VueRouter)

/**
 * List of router paths.
 *
 * @example 
 * {
 *   path: '/',           // The path to the page
 *   name: 'Home',        // The pages name
 *   canReuse: false,     // Can we reuse this component again (generally false)
 *   component: HomePage  // The component to inject for the page
 * }
 */
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

/**
 * The vue router.
 *
 * Can be imported with `import router from '@/router`
 */
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
