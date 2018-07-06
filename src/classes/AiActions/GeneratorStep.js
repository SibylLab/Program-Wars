import {Turn} from './AiChain'
import {store} from '../../store/store'

export default class Generator extends Turn {
  execute () {
    if (this.hand.generatorCard !== undefined && !store.getters.getCurrentPlayer.hasGenerator) {
      this.cardToPlay = this.hand.generatorCard
      this.moveType = 'protection'
      return true
    }
    return false
  }
}
