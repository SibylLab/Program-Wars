export default class StatusEffects {
  constructor (playerId) {
    this.playerId = playerId
    this.positive = []
    this.negative = []
  }

  hasPositive (effectType) {
    return positive.find(e => e.type === effectType)
  }

  hasNegative (effectType) {
    return negative.find(e => e.type === effectType)
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

      const effect = new CyberEffect(effectType, this.playerId)
      this.positiveEffects.push(effect)
    }
  }

  addNegative (effectType, attackerId) {
    if (!this.hasNegative(effectType) && !this.hasProtectionFrom(effectType)) {
      if (this.hasPositive('SCAN')) {
        this.removePositive('SCAN')
      } else {
        const effect = new CyberEffect(effectType, this.playerId, attackerId)  
        this.negativeEffects.push(effect)
      }
    }
  }

  removeEffect (effect) {
    this.positive = this.positive.filter(e => e !== effect)
    this.negative = this.negative.filter(e => e !== effect)
  }

  // Helpers //

  cleanMalware (player) {
    this.removeNegative('RANSOM')
    this.removeNegative('SPYWARE')
  }

  cleanHacks () {
    this.removeNegative('STACK_OVERFLOW')
    this.removeNegative('SQL_INJECTION')
  }

  removePositive (effectType) {
    this.positive = this.positive.filter(e => e.type !== effectType)
  }

  removeNegative (effectType) {
    this.negative = this.negative.filter(e => e.type !== effectType)
  }

  isHack (effectType) {
    return effectType === 'STACK_OVERFLOW' || effectType === 'SQL_INJECTION'
  }

  isMalware (effectType) {
    return effectType === 'VIRUS' || effectType === 'TROJAN'
        || effectType === 'RANSOM' || effectType === 'SPYWARE'
  }
}
