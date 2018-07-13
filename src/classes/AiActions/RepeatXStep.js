import {Turn} from './AiChain'

export default class RepeatX extends Turn {
  execute () {
    if (this.hand.rXCard !== undefined && this.move.getStackToRepeat(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.hand.rXCard
      this.stackToPlay = this.move.getStackToRepeat(this.event)
      this.moveType = 'play'
      return true
    }
    return false
  }
}

