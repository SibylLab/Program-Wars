//import { bus } from '@/components/SharedComponents/Bus'


export default {
  /**
   * Change the game state to a given new state.
   * Payload needs field -> newState: 'state'
   */
  changeGameState(state, payload) {
    state.gameState = payload.newState
  }
}
