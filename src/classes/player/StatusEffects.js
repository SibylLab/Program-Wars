import EffectFactory from '@/classes/statusEffects/EffectFactory'
import BonusEffect from '@/classes/statusEffects/BonusEffect'

export default class StatusEffects {
  constructor (playerId) {
    this.playerId = playerId
    this.positive = []
    this.negative = []
    this.bonus = []
    this.fact = new EffectFactory()
  }

  update () {
    let discards = this.updateEffects(this.positive) 
    return discards.concat(this.updateEffects(this.negative))
  }

  updateEffects (effects) {
    effects.map(e => e.update())

    const discards = effects.filter(e => {
      return e.turnsLeft === 0
    }).map(e => {
      return this.removeEffect(e)
    })

    return discards
  }

  hasPositive (effectType) {
    return this.getPositive(effectType) !== undefined
  }

  hasNegative (effectType) {
    return this.getNegative(effectType) !== undefined
  }

  hasProtectionFrom (effectType) {
    return (this.isHack(effectType) && this.hasPositive('FIREWALL'))
        || (this.isMalware(effectType) && this.hasPositive('ANTIVIRUS'))
  }

  addPositive (card) {
    const discard = []
    if (!this.hasPositive(card.type)) {
      if (card.type === 'ANTIVIRUS') {
        this.cleanMalware(discard)
      } else if (card.type === 'FIREWALL') {
        this.cleanHacks(discard)
      }

      const effect = this.fact.newSafetyEffect(card, this.playerId)
      this.positive.push(effect)
    }
    return discard
  }

  addNegative (card, attacker) {
    const discard = []
    if (!this.hasNegative(card.type) && !this.hasProtectionFrom(card.type)) {
      if (this.hasPositive('SCAN')) {
        this.removePositive('SCAN', discard)
      } else {
        const effect = this.fact.newAttackEffect(card, this.playerId, attacker)  
        this.negative.push(effect)
      }
    }
    return discard
  }

  removeEffect (effect) {
    if (effect.card.isSafety()) {
      this.positive = this.positive.filter(e => e !== effect)
    } else {
      this.negative = this.negative.filter(e => e !== effect)
    }
    return effect.destroy()
  }

  getPositive (effectType) {
    return this.positive.find(e => e.card.type === effectType)
  }

  getNegative (effectType) {
    return this.negative.find(e => e.card.type === effectType)
  }

  addBonus (type, effectId, amount) {
    this.bonus.push(new BonusEffect(type, effectId, amount))
  }

  removeBonus (effectId) {
    this.bonus = this.bonus.filter(b => b.effectId !== effectId)
  }

  getScoreAdjustment () {
    let score = this.bonus.reduce((acc, b) => { return acc + b.amount }, 0)

    const negatives = this.negative.filter(e => e.card.type !== 'SQL_INJECTION')
    score -= negatives.reduce((acc, e) => { return acc + e.penalty }, 0)

    return score
  }

  // Helpers //

  cleanMalware (discard) {
    this.removeNegative('RANSOM', discard)
    this.removeNegative('SPYWARE', discard)
  }

  cleanHacks (discard) {
    this.removeNegative('STACK_OVERFLOW', discard)
    this.removeNegative('SQL_INJECTION', discard)
  }

  removePositive (effectType, discard) {
    const effect = this.getPositive(effectType)
    if (effect) {
      discard.push(this.removeEffect(effect))
    }
  }

  removeNegative (effectType, discard) {
    const effect = this.getNegative(effectType)
    if (effect) {
      discard.push(this.removeEffect(effect))
    }
  }

  isHack (effectType) {
    return effectType === 'STACK_OVERFLOW' || effectType === 'SQL_INJECTION'
  }

  isMalware (effectType) {
    return effectType === 'VIRUS' || effectType === 'TROJAN'
        || effectType === 'RANSOM' || effectType === 'SPYWARE'
  }
}
