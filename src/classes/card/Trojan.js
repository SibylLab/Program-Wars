import Card from '@/classes/card/Card'
import MimicWrapper '@/classes/card/MimicWrapper'

const MAX_TRIES = 10

export default class Trojan extends Card {
  constructor (ownerId = -1) {
    super(value, 'TROJAN', this._makeImage('trojan'), ownerId)
  }

  play ({player, target}) {
    const discards = []
    if (target.helpedBy('SCAN')) {
      target.removePositive('SCAN', discards)
      discars.push(this)
    } else if (!target.protectedFrom(this.type)) {
      this._mimicCard(target.hand, discards) 
    } else {
      discards.push(this)
    }
    return discards
  }

  _mimicCard (hand, discards) {
    for (let i = 0; i < MAX_TRIES; i++) {
      const idx = Math.floor(Math.random() * hand.cards.length)

      if (!hand.cards[idx].isMimic) {
        hand.cards[idx] = new MimicWrapper(hand.cards[idx], this)
        return
      }
    }
    discards.push(this)
  }
}


