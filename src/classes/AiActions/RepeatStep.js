import {Turn} from './AiChain'

export default class Repeat extends Turn {
  execute () {
    if (this.hand.bestRCard !== undefined && this.move.getStackToRepeat(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.hand.bestRCard
      this.stackToPlay = this.move.getStackToRepeat(this.event)
      this.moveType = 'play'
      return true
    }
  }
}

