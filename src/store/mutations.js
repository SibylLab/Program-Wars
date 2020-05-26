//import { bus } from '@/components/SharedComponents/Bus'
import Timer from 'easytimer'


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
  },

  /**
   * Setup a new timer.
   */
  newTimer (state) {
    state.timer = new Timer()
    state.timer.start()
    // eslint-disable-next-line no-unused-vars
    state.timer.addEventListener('secondsUpdated', function (e) {
      $('#basicUsage').html(state.timer.getTimeValues().toString())
    })
  },

  /**
   * Stop the current timer.
   */
  stopTimer (state) {
    if (state.timer) {
      state.timer.stop()
    }
  }
}
