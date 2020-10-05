/**
 * Vuex actions for performing multiple mutations and more complex actions
 * on the vuex state.
 *
 * We only use these for setting up and changing pages right now as most
 * complex state changes are done in the page state classes. This does not
 * follow the vuex philosphy directly, but it keeps the project resonably well
 * organized and uses the OOP style that future students will most likley be
 * most familiar with.
 *
 * See {@link https://vuex.vuejs.org/guide/actions.html} for more information.
 * @module actions
 */

import BeginnerGame from '@/pages/pageStates/BeginnerGame'
import StandardGame from '@/pages/pageStates/StandardGame'

/**
 * Starts a new beginner game, creating the state and navigating to the page.
 *
 * @param {function} commit - A vuex function that allows commiting mutations.
 * @param {Object} payload - The information needed for the action.
 * @param {Player[]} payload.players - A list of players in the game.
 * @param {Object} payload.level - A level object for the game. See
 * {@link deckData} for more information on what this object looks like.
 */
function startBeginnerGame ({ commit }, { players, level }) {
  commit('pushGameState', { gameState: new BeginnerGame(players, level) })
  commit('changePage', { page: 'beginner' })
}

/**
 * Starts a new standard game, creating the state and navigating to the page.
 *
 * @param {function} commit - A vuex function that allows commiting mutations.
 * @param {Object} payload - The information needed for the action.
 * @param {Player[]} payload.players - A list of players in the game.
 * @param {Object} payload.level - A level object for the game. See
 * {@link deckData} for more information on what this object looks like.
 */
function startStandardGame ({ commit }, { players, level }) {
  commit('pushGameState', { gameState: new StandardGame(players, level) })
  commit('changePage', { page: 'standard' })
}

/**
 * Navigates back to the home page, does not change the home page.
 *
 * @param {function} commit - A vuex function that allows commiting mutations.
 */
function leaveGame ({ commit }) {
  commit('seenBackstory')
  commit('changePage', { page: 'home' })
}

export default {
  startBeginnerGame,
  startStandardGame,
  leaveGame
}
