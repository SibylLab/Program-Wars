import Hand from '@/classes/player/Hand'
import Stacks from '@/classes/stack/Stacks'
import StatusEffects from '@/classes/statusEffect/StatusEffects'

export default class Player {
  constructor (id, name) {
    this.id = id
    this.name = name
    this.isAI = false
    this.hand = new Hand(id)
    this.playField = new Stacks(id)
    this.effects = new StatusEffects(id)
    this.image = 'static/playerImages/player' + id + '.png'
  }

  update () {
    return this.effects.update()
  }

  getScore () {
    let score = this.stacks.getScore(this.getStackAdjustments())
    score += this.effects.getScoreAdjustment()
    return score
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

  getAllAttacks () {
    const effects = this.effects.negative
    const virusStacks = this.stacks.getStacksWithVirus()
    const mimics = this.hand.getMimics()
    return { effects, virusStacks, mimics }
  }
}
