import Card from '@/classes/card/Card'

export default class Scan extends Card {
  constructor (ownerId = -1) {
    super(0, 'SCAN', Card.imgPath('scan'), ownerId)
  }

  play ({ player, target, targetType }) {
    if (targetType === 'player' && this._canAddScan(target)) {
      target.effects.addPositive(this)
      return []
    } else if (targetType === 'stack') {
      return [target.popTop(), this]
    } else if (targetType === 'mimic') {
      player.hand.removeCard(target)
      return [target, this]
    } else if (targetType === 'effect') {
      return [player.effects.removeEffect(target), this]
    }
    return [this]
  }

  _canAddScan (target) {
    const attacks = target.getAllAttacks()
    return attacks.virusStacks.length === 0 && attacks.effects.length === 0
        && attacks.mimics.length === 0
  }
}


