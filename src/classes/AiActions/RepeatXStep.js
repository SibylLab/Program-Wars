import {Turn} from './AiChain'

export default class RepeatX extends Turn {
  execute () {
    console.log('rX card: ' + JSON.stringify(this.hand.rXCard))
    console.log('stackToRepeat: ' + JSON.stringify(this.move.getStackToRepeat(this.event)))
    console.log('stack to play ' + this.event.stack.find(stack => stack.boolSide === this.boolSide))
    if (this.hand.rXCard !== undefined && this.move.getStackToRepeat(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      console.log('in Repeat')
      this.cardToPlay = this.hand.rXCard
      this.stackToPlay = this.move.getStackToRepeat(this.event)
      this.moveType = 'play'
      return true
    }
  }
}

