import Hand from '@/classes/player/Hand'
import PlayField from '@/classes/stack/PlayField'
import StatusEffects from '@/classes/statusEffect/StatusEffects'
import { isAttack, isAlgorithm, isSpecial } from '@/classes/card/cardData'

export default class Player {
  constructor (id, name) {
    this.id = id
    this.name = name
    this.isAI = false
    this.hand = new Hand(id)
    this.playField = new PlayField(this)
    this.effects = new StatusEffects(this)
    this.image = 'static/playerImages/player' + id + '.png'
  }

  update () {
    this.effects.update()
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
    const effects = this.effects.negative.filter(e => isAttack(e.type))
    const virusStacks = this.playField.getStacksWithVirus()
    const mimics = this.hand.getMimics()
    return { effects, virusStacks, mimics }
  }

  canPlay (type) {
    if (isAttack(type) || isAlgorithm(type)) {
      return !this.hurtBy('STACK_UNDERFLOW')
    } else if (!isSpecial(type)) {
      return !this.hurtBy('STACK_OVERFLOW')
    }
    return true
  }
}
