//import { bus } from '@/components/SharedComponents/Bus'
import router from '@/router'


export default {
  /**
   * Starts a new game.
   * Fully initializes a new state and navigates to the game page.
   * Payload needs field players wich is a list of objects
   * of the form {name: 'name', ai: bool}
   */
  newGame (context, payload) {
    context.commit('resetStateForGame')
    context.commit('newTimer')
    context.commit('addPlayers', payload)
    context.commit('createNewDeck', {numPlayers: context.state.players.length})

    for (let p of context.state.players) {
      context.commit('giveNewHand', {player: p})
    }

    context.commit('setupMockGame')
    router.push('game')
  },

  /**
   * Leaves the current game and navigates back to home.
   * Any current game state may be lost.
   * Will reset any state information for starting a new game.
   */
  leaveGame (context) {
    context.dispatch('resetForHome')
    router.push('home')
  },

  /**
   * Resets necessary elements before returning to landing page.
   */
  resetForHome (context) {
    context.commit('changeGameState', {newState: 'home'})
    context.commit('stopTimer')
  },
}
