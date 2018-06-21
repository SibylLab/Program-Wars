import {Turn} from './AiChain'
import {store} from '../../store/store'

export default class AntiVirus extends Turn {
  execute () {
    if (this.hand.antiVirusCard !== undefined && !store.getters.getCurrentPlayer.hasAntiVirus) {
      this.cardToPlay = this.hand.antiVirusCard
      this.moveType = 'protection'
      return true
    }
  }
}

