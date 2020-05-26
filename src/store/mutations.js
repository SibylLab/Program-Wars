//import { bus } from '@/components/SharedComponents/Bus'


export default {
  /**
   * Change the game state to a given new state.
   * Payload needs field -> newState: 'state'
   */
  changeGameState(state, payload) {
    state.gameState = payload.newState
  },

  /**
   * Toggle tips on and off.
   */
  toggleTips (state) {
    state.tips.showTips = !state.tips.showTips
    console.log(state.tips.showTips)
  },

  /**
   * Set a new timer.
   */
  setTimer (state, payload) {
    state.timer = payload.timer
  },

  /**
   * Stop the current timer.
   */
  stopTimer (state) {
    if (state.timer) {
      state.timer.stop()
    }
    console.log("stopping timer")
  }
}
