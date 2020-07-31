import CardWrapper from '@/classes/card/CardWrapper'
import ExtraCardWrapper from '@/classes/card/ExtraCardWrapper'
import NegtiveEffectCard from '@/classes/card/NegativeEffectCard'
import Virus from '@/classes/card/Virus'

export default class MimicWrapper extends Card {
  constructor (card, trojan) {
    super(card.value, card.ownerId)
    this.card = card
  }

  getDiscards () {
    return [this.card, this.trojan]
  }

  play (playInfo) {
    const replacement = this._replace()
    discards = replacement.play(playInfo)
    discards.push(this.trojan)
    return discards
  }

  _replace () {
    let card
    if (this.card.type === 'REPEAT' || this.card.type === 'VARIABLE') {
      card = new Virus()
    } else if (this.card.isBase()) {
      card = new NegativeEffectCard('STACK_OVERFLOW')
    } else if (this.card.isAttack()) {
      card = new NegativeEffectCard('STACK_UNDERFLOW')
    } else {
      card = new NegativeEffectCard('RANSOM')
    }
    return new ExtraCardWrapper(card)
  }
}

