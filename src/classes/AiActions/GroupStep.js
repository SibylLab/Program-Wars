import {Turn} from './AiChain'

export default class Group extends Turn {
  constructor (hand, boolSide, move, event, canGroup) {
    super(hand, boolSide, move, event)
    this.canGroup = canGroup
  }

  execute () {
    if (this.hand.bestGCard.length > 0 && this.canGroup !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.canGroup.cardToPlay
      this.stackToPlay = this.canGroup.stackToPlay
      this.moveType = 'group'
      return true
    }
  }
}
