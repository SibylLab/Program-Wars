import Card from '@/classes/card/Card'

export default class NegativeEffectCard extends Card {
  constructor (type, ownerId = -1) {
    super(value, type, this._makeImage(type), ownerId)
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

