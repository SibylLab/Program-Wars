/**
 * Storage for persistent application state.
 *
 * See {@link  https://vuex.vuejs.org/guide/state.html} for more information.
 * @module store
 */

import Home from '@/pages/pageStates/Home'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'
import mutations from './mutations'
import getters from './getters'


/**
 * The store for persistent application state.
 *
 * @prop {Object} state - The persistent application state.
 * ```
 * {
 *   page          // The current page.
 *   home          // The state for the home page.
 *   game          // The game state for the game page.
 *   showBackstory // True if we have not displayed the backstory to the player yet.
 * }
 * ```
 * @prop {Object} getters - vuex getters {@link getters}
 * @prop {Object} mutations - vuex mutations {@link mutations}
 * @prop {Object} actions -vuex actions {@link actions}
 */
export const store = new Vuex.Store({
  state: {
    page: 'home',
    home: new Home(),
    game: null,
    showBackstory: true
  },

  getters,
  mutations,
  actions
})
