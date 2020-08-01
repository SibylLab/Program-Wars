import Hand from '@/classes/player/Hand'
import PlayField from '@/classes/stack/PlayField'
import StatusEffects from '@/classes/statusEffect/StatusEffects'

export default class Player {
  constructor (id, name) {
    this.id = id
    this.name = name
    this.isAI = false
    this.hand = new Hand(id)
    this.playField = new PlayField(id)
    this.effects = new StatusEffects(id)
    this.image = 'static/playerImages/player' + id + '.png'
  }

  update () {
    return this.effects.update()
  }

  getScore () {
    let score = this.playField.getScore()
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
    const virusStacks = this.playField.getStacksWithVirus()
    const mimics = this.hand.getMimics()
    return { effects, virusStacks, mimics }
  }
}
