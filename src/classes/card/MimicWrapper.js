import CardWrapper from '@/classes/card/CardWrapper'
import ExtraCardWrapper from '@/classes/card/ExtraCardWrapper'
import NegtiveEffectCard from '@/classes/card/NegativeEffectCard'
import Virus from '@/classes/card/Virus'

export default class MimicWrapper extends CardWrapper {
  constructor (card, trojan) {
    super(card)
    this.trojan = trojan
    this.isMimic = true
  }

  getDiscards () {
    let discards = super.getDiscards()
    return discards.concat(this.trojan.getDiscards())
  }

  play (playInfo) {
    const replacement = this._replace()
    return replacement.play(playInfo)
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

