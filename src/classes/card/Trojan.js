import Card from '@/classes/card/Card'
import MimicWrapper from '@/classes/card/MimicWrapper'

const MAX_TRIES = 10

export default class Trojan extends Card {
  constructor (ownerId = -1) {
    super(0, 'TROJAN', Card.imgPath('trojan'), ownerId)
  }

  play (playInfo) {
    if (playInfo.target.helpedBy('SCAN')) {
      return this._blockedByScan(playInfo)
    } else if (!playInfo.target.protectedFrom(this.type)) {
      this._mimicCard(playInfo.target.hand) 
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


