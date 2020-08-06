import Card from '@/classes/card/Card'
import EffectFactory from '@/classes/statusEffect/EffectFactory'

export default class NegativeEffectCard extends Card {
  constructor (type, deck) {
    super(0, type, deck, Card.imgPath(type.toLowerCase()))
  }

  play (playInfo) {
    if (!playInfo.target.hurtBy(this.type)
        && !playInfo.target.protectedFrom(this.type)) {
      if (playInfo.target.helpedBy('SCAN')) {
        this._blockedByScan(playInfo)
        this.discard()
      } else {
        const extraTurns = playInfo.replaced ? 1 : 0
        const fact = new EffectFactory(playInfo.target)
        const attacker = playInfo.replaced ? playInfo.attacker : playInfo.player
        const effect = fact.newNegativeFromCard(this, extraTurns, attacker)
        playInfo.target.effects.addNegative(effect)
      }
    } else {
      this.discard()
    }
  }
}

