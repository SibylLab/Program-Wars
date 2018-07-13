import {Turn} from './AiChain'

export default class Hack extends Turn {
  execute () {
    console.log('hack card: ' + this.hand.hackCard)
    console.log('getHackOpponent: ' + JSON.stringify(this.move.getHackOpponent(this.event)))
    if (this.hand.hackCard !== undefined && this.move.getHackOpponent(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.hand.hackCard
      this.opponentToAttack = this.move.getHackOpponent(this.event)
      this.moveType = 'hack'
      return true
    }
    return false
  }
}

