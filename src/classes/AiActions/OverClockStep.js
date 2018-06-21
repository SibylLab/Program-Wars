import {Turn} from './AiChain'
import {store} from '../../store/store'

export default class OverClock extends Turn {
  execute () {
    if (this.hand.overclockCard !== undefined && !store.getters.getCurrentPlayer.hasOverclock) {
      this.cardToPlay = this.hand.overclockCard
      this.moveType = 'enhance'
      return true
    }
  }
}

