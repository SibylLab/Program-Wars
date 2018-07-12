import {Turn} from './AiChain'

export default class Variable extends Turn {
  execute () {
    console.log('card ' + JSON.stringify(this.hand.bestVCard))
    console.log('stackToAddvariabel: ' + JSON.stringify(this.move.stackToAddVariable(this.event)))
    console.log('stacks: ' + JSON.stringify(this.event.stack.find(stack => stack.boolSide === this.boolSide)))
    if (this.hand.bestVCard !== undefined && this.move.stackToAddVariable(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      console.log('in variable')
      this.cardToPlay = this.hand.bestVCard
      this.stackToPlay = this.move.stackToAddVariable(this.event)
      this.moveType = 'play'
      return true
    }
  }
}

