import Card from '@/classes/card/Card'

export default class PositiveEffectCard extends Card {
  constructor (type, ownerId = -1) {
    super(value, type, this._makeImage(type), ownerId)
  }

  play ({player, target}) {
    if (!target.helpedBy(this.type)) {
      return target.effects.addPositive(this, player)
    } else {
      return [this]
    }
  }
}

