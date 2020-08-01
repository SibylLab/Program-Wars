import Card from '@/classes/card/Card'

export default class NegativeEffectCard extends Card {
  constructor (type, ownerId = -1) {
    super(0, type, type.toLowerCase(), ownerId)
  }

  play ({player, target}) {
    if (!target.hurtBy(this.type) && !target.protectedFrom(this.type)) {
      target.effects.addNegative(this, player)
      return []
    } else {
      return [this]
    }
  }
}

