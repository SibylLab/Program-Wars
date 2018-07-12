import {Turn} from './AiChain'

export default class Discard extends Turn {
  execute () {
    this.cardToPlay = this.hand.cards[0]
    this.moveType = 'discard'
    return true
  }
}
