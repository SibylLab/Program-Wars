import StatusEffects from '@/classes/player/StatusEffects'
import Hand from '@/classes/player/Hand'
import Stacks from '@/classes/player/Stacks'

export default class Player {
  constructor (id, name) {
    this.id = id
    this.name = name
    this.isAI = false
    this.hand = new Hand(id)
    this.stacks = new Stacks(id)
    this.effects = new StatusEffects(id)
    this.image = 'static/playerImages/player' + id + '.png'
  }

  helpedBy (effectType) {
    return this.effects.hasPositive(effectType)
  }

  hurtBy (effectType) {
    return this.effects.hasNegative(effectType)
  }

  protectedFrom (effectType) {
    return this.effects.hasProtectionFrom(effectType)
  }

  getScore () {
    const penalties = {method: 0, base: 0, stack: 0}
    if (this.effects.hurtBy('SQL_INJECTION')) {
      penalties.method = 2
    }
    return this.stacks.getScore(penalties)
  }
}
