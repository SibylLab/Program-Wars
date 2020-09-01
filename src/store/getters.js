/**
 * Vuex getters to retrieve things from the vuex state.
 *
 * See {@link  https://vuex.vuejs.org/guide/getters.html} for more information.
 * @module getters
 */

/**
 * Returns the current page name.
 * @param {Object} state - The vuex `store.state`.
 * @return {string} The current page name.
 */
function page (state) {
  return state.page
}

/**
 * Returns the current home page state.
 * @param {Object} state - The vuex `store.state`.
 * @return {Home} The current home page state.
 */
function home (state) {
  return state.home
}

/**
 * Returns the current game page state.
 * @param {Object} state - The vuex `store.state`.
 * @return {Game} The current game page state.
 */
function game (state) {
  return state.game
}

/**
 * Checks to see if the page we are on is a game page.
 * @param {Object} state - The vuex `store.state`.
 * @return {bool} True if we are on a game page.
 */
function inGame (state) {
  return state.page === 'beginner' || state.page === 'standard'
}

export default {
  page,
  home,
  game,
  inGame
}
