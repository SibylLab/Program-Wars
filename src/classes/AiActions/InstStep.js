import {Turn} from './AiChain'
import {store} from '../../store/store'

export default class Instruction extends Turn {
  execute () {
    if (this.hand.bestICard !== undefined && !store.getters.getCurrentPlayer.hasPowerOutage) {
      this.cardToPlay = this.hand.bestICard
      this.stackToPlay = this.event.stack.find(stack => stack.boolSide === this.boolSide && stack.score === 0)
      this.moveType = 'play'
      return true
    }
  }
}
