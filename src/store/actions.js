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
    payload
    context.commit('changeGameState', {newState: 'game'})
    context.commit('newTimer')
    // use player info in payload and setup a new game
    // need to mutate to defaults or new game
    // some changes can be put in a mutation some will have to
    // be in mutation in here
    router.push('game')
  },

  /**
   * Leaves the current game and navigates back to home.
   * Any current game state may be lost.
   * Will reset any state information for starting a new game.
   */
  leaveGame (context, payload) {
    payload
    // For now it just changes state, but later it may need to cleanup or
    // setup the state for the home page?
    // from the game before heading to the home page
    context.commit('changeGameState', {newState: 'home'})
    context.commit('stopTimer')
    router.push('home')
  }
}
