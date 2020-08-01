import Card from '@/classes/card/Card'
import MimicWrapper from '@/classes/card/MimicWrapper'

const MAX_TRIES = 10

export default class Trojan extends Card {
  constructor (ownerId = -1) {
    super(0, 'TROJAN', Card.imgPath('trojan'), ownerId)
  }

  play ({target}) {
    if (target.helpedBy('SCAN')) {
      return [...target.removePositiveType('SCAN'), this]
    } else if (!target.protectedFrom(this.type)) {
      this._mimicCard(target.hand) 
    }
    return [this]
  }

  _mimicCard (hand) {
    for (let i = 0; i < MAX_TRIES; i++) {
      const idx = Math.floor(Math.random() * hand.cards.length)

      if (!hand.cards[idx].isMimic) {
        hand.cards[idx] = new MimicWrapper(hand.cards[idx], this)
        return
      }
    }
  }
}


