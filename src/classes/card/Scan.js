import Card from '@/classes/card/Card'

export default class Scan extends Card {
  constructor (deck) {
    super(0, 'SCAN', deck, Card.imgPath('scan'))
  }

  play ({ player, target, targetType }) {
    if (targetType === 'player' && this._canAddScan(target)) {
      target.effects.addPositive(this)
      return
    }

    if (targetType === 'stack') {
      target.popTop().discard()
    } else if (targetType === 'mimic') {
      player.hand.removeCard(target)
      target.discard()
    } else if (targetType === 'effect') {
      player.effects.removeEffect(target)
    }
    this.discard()
  }

  _canAddScan (target) {
    const attacks = target.getAllAttacks()
    return attacks.virusStacks.length === 0 && attacks.effects.length === 0
        && attacks.mimics.length === 0
  }
}


