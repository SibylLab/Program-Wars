import {Turn} from './AiChain'

export default class Group extends Turn {
  constructor (hand, boolSide, move, event, canGroup) {
    super(hand, boolSide, move, event)
    this.canGroup = canGroup
  }

  execute () {
    console.log('gcard: ' + JSON.stringify(this.hand.bestGCard))
    console.log('canGroup: ' + JSON.stringify(this.canGroup))
    console.log('stack: ' + this.event.stack.find(stack => stack.boolSide === this.boolSide))
    if (this.hand.bestGCard.length > 0 && this.canGroup !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.canGroup.cardToPlay
      this.stackToPlay = this.canGroup.stackToPlay
      this.moveType = 'group'
      return true
    }
  }
}
