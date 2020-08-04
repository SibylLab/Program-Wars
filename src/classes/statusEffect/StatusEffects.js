import EffectFactory from '@/classes/statusEffect/EffectFactory'
import BonusEffect from '@/classes/statusEffect/BonusEffect'
import * as cardData from '@/classes/card/cardData'

export default class StatusEffects {
  constructor (playerId) {
    this.playerId = playerId
    this.positive = []
    this.negative = []
    this.bonus = []
    this.coolDowns = []
    this.fact = new EffectFactory()
  }

  update () {
    this.updateCoolDowns()
    let discards = this.updateEffects(this.positive) 
    return discards.concat(this.updateEffects(this.negative))
  }

  updateCoolDowns () {
    this.coolDowns.map(cd => cd.update())
    this.coolDowns = this.coolDowns.filter(cd => cd.isActive())
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

  getScoreAdjustment () {
    let score = this.bonus.reduce((acc, b) => { return acc + b.amount }, 0)

    const negatives = this.negative.filter(e => e.card.type !== 'SQL_INJECTION')
    score -= negatives.reduce((acc, e) => { return acc + e.penalty }, 0)

    return score
  }

  hasPositive (effectType) {
    return this.positive.filter(p => p.card.type === effectType).length > 0
  }

  hasNegative (effectType) {
    return this.negative.filter(n => n.card.type === effectType).length > 0
  }

  getNegative (type, attacker) {
    return this.negative.find(n => n.card.type === type && n.attacker === attacker)
  }

  hasProtectionFrom (effectType) {
    return (cardData.isHack(effectType) && this.hasPositive('FIREWALL'))
        || (cardData.isMalware(effectType) && this.hasPositive('ANTIVIRUS'))
  }

  // don't add cards that are already here
  addPositive (card) {
    const effect = this.fact.newSafetyEffect(card, this.playerId)
    this.positive.push(effect)
  }

  // don't add cards that are already here
  addNegative (card, attacker) {
    const effect = this.fact.newAttackEffect(card, this.playerId, attacker)  
    this.negative.push(effect)
  }

  // don't add cards that are already here
  addSql (card, attacker, methodStack) {
    const effect = this.fact.newSqlEffect(card, this.playerId, attacker, methodStack)
    this.negative.push(effect)
  }

  removeEffect (effect) {
    if (cardData.isPositiveEffect(effect.card.type)) {
      this.positive = this.positive.filter(e => e !== effect)
    } else {
      this.negative = this.negative.filter(e => e !== effect)
    }
    return effect.destroy()
  }

  removePositiveType (effectType) {
    const effects = this.positive.filter(p => p.card.type === effectType)
    this.positive = this.positive.filter(p => p.card.type !== effectType)
    return effects.map(e => e.destroy())
  }

  removeNegativeType (effectType) {
    const effects = this.negative.filter(n => n.card.type === effectType)
    this.negative = this.negative.filter(n => n.card.type !== effectType)
    return effects.map(e => e.destroy())
  }

  cleanMalware () {
    return [
      ...this.removeNegativeType('RANSOM'),
      ...this.removeNegativeType('SPYWARE')
    ]
  }

  cleanHacks () {
    return [
      ...this.removeNegativeType('STACK_OVERFLOW'),
      ...this.removeNegativeType('STACK_UNDERFLOW'),
      ...this.removeNegativeType('SQL_INJECTION'),
      ...this.removeNegativeType('DDOS')
    ]
  }

  addBonus (type, effectId, amount) {
    this.bonus.push(new BonusEffect(type, effectId, amount))
  }

  removeBonus (effectId) {
    this.bonus = this.bonus.filter(b => b.effectId !== effectId)
  }

  addCoolDown (type) {
    this.coolDowns.push(this.fact.newCoolDown(type, this.playerId))
  }

  hasCoolDown (type) {
    return this.getCD(type) !== undefined
  }

  getCD (type) {
    return this.coolDowns.find(cd => cd.type === type)
  }
}
