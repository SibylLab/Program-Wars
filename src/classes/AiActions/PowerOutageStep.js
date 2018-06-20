import {Turn} from './AiChain'

export default class PowerOutage extends Turn {
  constructor (hand, boolSide, move, event, opponentPO) {
    super(hand, boolSide, move, event)
    this.opponentPO = opponentPO
  }

  execute () {
    if (this.hand.powerOutageCard !== undefined && this.opponentPO !== undefined) {
      this.opponentToAttack = this.move.getOpponentToAttack(this.event, 'POWEROUTAGE')
      console.log('power outage opponent ' + this.opponentToAttack)
      this.cardToPlay = this.hand.powerOutageCard
      this.moveType = 'po'
      return true
    }
  }
}

