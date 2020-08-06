import EffectFactory from '@/classes/statusEffect/EffectFactory'
import * as cardData from '@/classes/card/cardData'

export default class StatusEffects {
  constructor (player) {
    this.player = player
    this.positive = []
    this.negative = []
  }

  update () {
    this.updateEffects(this.positive) 
    this.updateEffects(this.negative)
  }

  updateEffects (effects) {
    effects.map(e => e.update())

    effects.filter(e => {
      return e.turnsLeft === 0
    }).map(e => {
      this.removeEffect(e)
    })
  }

  getScoreAdjustment () {
    let score = 0

    const bonus = this.positive.map(b => {
      return b.getBonus()
    }).reduce((acc, scr) => {
      return acc + scr
    }, 0)

    const penalty = this.negative.filter(e => {
      return e.type !== 'SQL_INJECTION'
    }).map(n => {
      return n.getPenalty()
    }).reduce((acc, scr) => {
      return acc + scr
    }, 0)

    return score + bonus + penalty
  }

  hasPositive (effectType) {
    return this.positive.filter(p => p.type === effectType).length > 0
  }

  hasNegative (effectType, attacker = null) {
    const effects = this.negative.filter(n => n.type === effectType)
    if (attacker) {
      return effects.filter(e => e.attacker && e.attacker === attacker).length > 0
    } else {
      return effects.length > 0
    }
  }

  hasProtectionFrom (effectType) {
    return (cardData.isHack(effectType) && this.hasPositive('FIREWALL'))
        || (cardData.isMalware(effectType) && this.hasPositive('ANTIVIRUS'))
  }

  addPositive (effect) {
    if (!this.positive.find(e => e === effect)) {
      this.positive.push(effect)
    }
  }

  addNegative (effect) {
    if (!this.negative.find(e => e === effect)) {
      this.negative.push(effect)
    }
  }

  removeEffect (effect) {
    this.positive = this.positive.filter(e => e !== effect)
    this.negative = this.negative.filter(e => e !== effect)
    effect.destroy()
  }

  removePositiveType (effectType) {
    const effects = this.positive.filter(p => p.type === effectType)
    this.positive = this.positive.filter(p => p.type !== effectType)
    effects.map(e => e.destroy())
  }

  removeNegativeType (effectType) {
    const effects = this.negative.filter(n => n.type === effectType)
    this.negative = this.negative.filter(n => n.type !== effectType)
    effects.map(e => e.destroy())
  }

  cleanMalware () {
    this.removeNegativeType('RANSOM'),
    this.removeNegativeType('SPYWARE')
  }

  cleanHacks () {
    this.removeNegativeType('STACK_OVERFLOW'),
    this.removeNegativeType('STACK_UNDERFLOW'),
    this.removeNegativeType('SQL_INJECTION'),
    this.removeNegativeType('DDOS')
  }
}
