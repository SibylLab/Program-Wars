import {Turn} from './AiChain'
import {store} from '../../store/store'

export default class Virus extends Turn {
  constructor (hand, boolSide, move, event, opponentVirus) {
    super(hand, boolSide, move, event)
    this.opponentVirus = opponentVirus
  }

  execute () {
    if (this.hand.virusCard !== undefined && !store.getters.getFirstRound && this.opponentVirus !== undefined) {
      this.opponentToAttack = this.move.getOpponentToAttack(this.event, 'VIRUS')
      this.cardToPlay = this.hand.virusCard
      this.moveType = 'virus'
      return true
    }
  }
}

