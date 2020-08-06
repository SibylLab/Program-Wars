import Card from '@/classes/card/Card'

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
        playInfo.target.effects.addNegative(this, playInfo.player, extraTurns)
      }
    } else {
      this.discard()
    }
  }
}

