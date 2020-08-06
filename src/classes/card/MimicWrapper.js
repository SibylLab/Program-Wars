import CardWrapper from '@/classes/card/CardWrapper'
import NegativeEffectCard from '@/classes/card/NegativeEffectCard'
import Virus from '@/classes/card/Virus'
import { isBase, isAttack } from '@/classes/card/cardData'

export default class MimicWrapper extends CardWrapper {
  constructor (card, trojan, player) {
    super(card)
    this.trojan = trojan
    this.player = player
    this.isMimic = true
  }

  discard () {
    super.discard()
    this.trojan.discard()
  }

  play (playInfo) {
    const replacement = this._replace()
    playInfo.target = playInfo.player
    playInfo.attacker = this.player
    playInfo.replaced = true
    replacement.play(playInfo)
    this.discard()
  }

  _replace () {
    let card
    if (this.card.type === 'REPEAT' || this.card.type === 'VARIABLE') {
      card = new Virus()
    } else if (isBase(this.card.type)) {
      card = new NegativeEffectCard('STACK_OVERFLOW')
    } else if (isAttack(this.card.type)) {
      card = new NegativeEffectCard('STACK_UNDERFLOW')
    } else {
      card = new NegativeEffectCard('RANSOM')
    }
    card.isExtra = true
    return card
  }
}

