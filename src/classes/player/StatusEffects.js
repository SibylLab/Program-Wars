import CyberEffect from '@/classes/player/CyberEffect'
import EffectFactory from '@/classes/statusEffects/EffectFactory'

export default class StatusEffects {
  constructor (playerId) {
    this.playerId = playerId
    this.positive = []
    this.negative = []
    this.bonus = []
    this.fact = new EffectFactory()
  }

  hasPositive (effectType) {
    return this.positive.find(e => e.type === effectType)
  }

  hasNegative (effectType) {
    return this.negative.find(e => e.type === effectType)
  }

  hasProtectionFrom (effectType) {
    return (this.isHack(effectType) && this.hasPositive('FIREWALL'))
        || (this.isMalware(effectType) && this.hasPositive('ANTIVIRUS'))
  }

  addPositive (effectType) {
    if (!this.hasPositive(effectType)) {
      if (effectType === 'ANTIVIRUS') {
        this.cleanMalware()
      } else if (effectType === 'FIREWALL') {
        this.cleanHacks()
      }

      const effect = this.fact.newStatusEffect(effectType, this.playerId)
      this.positive.push(effect)
    }
  }

  addNegative (effectType, attacker) {
    if (!this.hasNegative(effectType) && !this.hasProtectionFrom(effectType)) {
      if (this.hasPositive('SCAN')) {
        this.removePositive('SCAN')
      } else {
        const effect = this.fact.newAttackEffect(effectType, this.playerId, attacker)  
        this.negative.push(effect)
      }
    }
  }

  removeEffect (effect) {
    this.positive = this.positive.filter(e => e !== effect)
    this.negative = this.negative.filter(e => e !== effect)
    effect.destroy()
  }

  getPositive (effectType) {
    return this.positive.find(e => e.type === effectType)
  }

  getNegative (effectType) {
    return this.negative.find(e => e.type === effectType)
  }

  addBonus (bonus) {
    this.bonus.push(bonus)
  }

  removeBonus (effectId) {
    this.bonus = this.bonus.filter(b => b.effectId !== effectId)
  }

  getScoreAdjustment () {
    let score = this.bonus.reduce((acc, b) => { return acc + b.amount }, 0)

    const negatives = this.negative.filter(e => e.type !== 'SQL_INJECTION')
    score -= negatives.reduce((acc, e) => { return acc + e.penalty }, 0)

    return score
  }

  // Helpers //

  cleanMalware () {
    this.removeNegative('RANSOM')
    this.removeNegative('SPYWARE')
  }

  cleanHacks () {
    this.removeNegative('STACK_OVERFLOW')
    this.removeNegative('SQL_INJECTION')
  }

  removePositive (effectType) {
    const effect = this.positive.find(e => e.type === effectType)
    this.removeEffect(effect)
  }

  removeNegative (effectType) {
    const effect = this.negative.find(e => e.type === effectType)
    this.removeEffect(effect)
  }

  isHack (effectType) {
    return effectType === 'STACK_OVERFLOW' || effectType === 'SQL_INJECTION'
  }

  isMalware (effectType) {
    return effectType === 'VIRUS' || effectType === 'TROJAN'
        || effectType === 'RANSOM' || effectType === 'SPYWARE'
  }
}
