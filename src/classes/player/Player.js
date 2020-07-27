import StatusEffects from '@/classes/player/StatusEffects'
import Hand from '@/classes/player/Hand'
import Stacks from '@/classes/player/Stacks'

const HAND_SIZE = 5

export default class Player {
  constructor (id, name) {
    this.id = id
    this.name = name
    this.isAI = false
    this.handSize = HAND_SIZE
    this.hand = new Hand(id)
    this.stacks = new Stacks(id)
    this.effects = new StatusEffects(id)
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
    return stacks.getScore(this.statusEffects)
  }
}
