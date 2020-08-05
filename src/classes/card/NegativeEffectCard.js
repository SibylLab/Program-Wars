import Card from '@/classes/card/Card'

export default class NegativeEffectCard extends Card {
  constructor (type, ownerId = -1) {
    super(0, type, Card.imgPath(type.toLowerCase()), ownerId)
  }

  play (playInfo) {
    if (!playInfo.target.hurtBy(this.type)
        && !playInfo.target.protectedFrom(this.type)) {
      if (playInfo.target.helpedBy('SCAN')) {
        return this._blockedByScan(playInfo)
      }
      const extraTurns = playInfo.replaced ? 1 : 0
      playInfo.target.effects.addNegative(this, playInfo.player, extraTurns)
      return []
    } else {
      return [this]
    }
  }
}

