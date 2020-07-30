import Hand from '@/classes/player/Hand'
import Stacks from '@/classes/player/Stacks'
import StatusEffects from '@/classes/player/StatusEffects'

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

  getAllAttacks () {
    const effects = this.effects.negative
    const virusStacks = this.stacks.getStacksWithVirus()
    const mimics = this.hand.getMimics()
    return { effects, virusStacks, mimics }
  }

  getScore () {
    let score = this.stacks.getScore(this.getStackAdjustments())
    score += this.effects.getScoreAdjustment()
    return score
  }

  update () {
    return this.effects.update()
  }

  getStackAdjustments () {
    const adjs = {method: 0}
    if (this.hurtBy('SQL_INJECTION')) {
      const sql = this.effects.getNegative('SQL_INJECTION')
      adjs.method -= sql.penalty
    }
    return adjs
  }
}
