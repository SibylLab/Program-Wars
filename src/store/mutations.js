/**
 * Vuex mutations to change the vuex store state.
 *
 * We do not use these much as most of the state is kept in the page state
 * objects and they are interacted with directly by components. This does not
 * follow the vuex philosphy directly, but it keeps the project resonably well
 * organized and uses the OOP style that future students will most likley be
 * most familiar with.
 *
 * See {@link https://vuex.vuejs.org/guide/mutations.html} for more information.
 * @module mutations
 */

import router from '@/router'

/**
 * Updates the state when the backstory has been seen.
 * @param {Object} state - The vuex store state.
 */
function seenBackstory (state) {
  state.showBackstory = false
}

/**
 * Sets the page value to a new given page.
 * @param {Object} state - The vuex store state.
 * @param {Object} payload - The information for the mutation.
 * @param {string} payload.page - The new page value.
 */
function setPage (state, { page }) {
  state.page = page
}

/**
 * Sets the new page to the given page and navigates to that page with the
 * router.
 *
 * @param {Object} state - The vuex store state.
 * @param {Object} payload - The information for the mutation.
 * @param {string} payload.page - The new page value.
 */
function changePage (state, { page }) {
  state.page = page
  if (page === 'home') {
    router.push('/')
  } else {
    router.push(page)
  }
}

/**
 * Sets the game state to the new game state.
 *
 * Called push as it may be necessary in the future to maintain a stack of
 * game states for certain modes (i.e. agile mode in PW3) where players
 * may want to go back to a previous game setup page to update their choices.
 * However, right now it just changes to the new state. It could be updated
 * to use a stack or eventually just renamed to better indicate its functionality.
 */
function pushGameState (state, { gameState }) {
  state.game = gameState
}

export default {
  seenBackstory,
  setPage,
  changePage,
  pushGameState
}
