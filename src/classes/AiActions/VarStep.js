import {Turn} from './AiChain'

export default class Variable extends Turn {
  execute () {
    if (this.hand.bestVCard !== undefined && this.move.stackToAddVariable(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.hand.bestVCard
      this.stackToPlay = this.move.stackToAddVariable(this.event)
      this.moveType = 'play'
      return true
    }
  }
}

