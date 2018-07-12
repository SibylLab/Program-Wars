import {Turn} from './AiChain'

export default class Discard extends Turn {
  execute () {
    console.log(JSON.stringify(this.event.hand.cards))
    this.cardToPlay = this.event.hand.cards[0]
    this.moveType = 'discard'
    return true
  }
}
