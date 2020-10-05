import * as cardData from '@/classes/card/cardData'

/**
 * Class for holding a player's status effects.
 * @prop {StatusEffect[]} positive - All positive effects on the player.
 * @prop {StatusEffect[]} negative - All negative effects on the player.
 */
class StatusEffects {
  /**
   * Creates a new StatusEffects object for a given player.
   * @param {Player} player - The player who the effects are applied to.
   */
  constructor (player) {
    this.player = player
    this.positive = []
    this.negative = []
  }

  /**
   * Updates all the contained status effects.
   */
  update () {
    this._updateEffects(this.positive) 
    this._updateEffects(this.negative)
  }

  /**
   * Updates a given list of effects and removes those that are no longer active.
   * @private
   */
  _updateEffects (effects) {
    effects.map(e => e.update())

    effects.filter(e => {
      return e.turnsLeft === 0
    }).map(e => {
      this.removeEffect(e)
    })
  }

  /**
   * Returns an adjustment amount to be added to the player's score, made from
   * all the penalties and bonuses affecting the player.
   * @return {int} A point value to add to the player's score.
   */
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

  /**
   * Checks if a given positive effect type is present.
   *
   * @param {string} effectType - The effect type to check. The caller is
   * responsible for ensureing it is a positive effect. If it is not it will
   * always be false.
   * @return {bool} True if there is a positive effect of that type present,
   * false otherwise.
   */
  hasPositive (effectType) {
    return this.positive.filter(p => p.type === effectType).length > 0
  }

  /**
   * Checks if a given negative effect type is present.
   *
   * @param {string} effectType - The effect type to check. The caller is
   * responsible for ensureing it is a negative effect. If it is not it will
   * always be false.
   * @param {Player} [attacker=null] - An optional attacker to check that the
   * effect type is present **and** was added by the attacker.
   * @return {bool} True if there is a negative effect of that type present,
   * false otherwise.
   */
  hasNegative (effectType, attacker = null) {
    const effects = this.negative.filter(n => n.type === effectType)
    if (attacker) {
      return effects.filter(e => e.attacker && e.attacker === attacker).length > 0
    } else {
      return effects.length > 0
    }
  }

  /**
   * Checks to see if the player has protection from the given effect type.
   * @param {string} effectType - The effect type to check for.
   * @return {bool} True if the player is protected from this effect, false otherwise.
   */
  hasProtectionFrom (effectType) {
    return (cardData.isHack(effectType) && this.hasPositive('FIREWALL'))
        || (cardData.isMalware(effectType) && this.hasPositive('ANTIVIRUS'))
  }

  /**
   * Adds the given positive effect.
   *
   * The caller is responsible for ensuring the effect is a positive effect.
   * The effect will not be added if it is already present.
   *
   * @param {StatusEffect} effect - The effect to add.
   */
  addPositive (effect) {
    if (!this.positive.find(e => e === effect)) {
      this.positive.push(effect)
    }
  }

  /**
   * Adds the given negative effect.
   *
   * The caller is responsible for ensuring the effect is a negative effect.
   * The effect will not be added if it is already present.
   *
   * @param {StatusEffect} effect - The effect to add.
   */
  addNegative (effect) {
    if (!this.negative.find(e => e === effect)) {
      this.negative.push(effect)
    }
  }

  /**
   * Removes and destroys the given effect regardless of whether it is
   * negative or positive.
   * @param {StatusEffect} effect - The effect to remove.
   */
  removeEffect (effect) {
    this.positive = this.positive.filter(e => e !== effect)
    this.negative = this.negative.filter(e => e !== effect)
    effect.destroy()
  }

  /**
   * Removes and destroys **all** effects of the given positive type.
   * @param {string} effectType - The effect type to remove.
   */
  removePositiveType (effectType) {
    const effects = this.positive.filter(p => p.type === effectType)
    this.positive = this.positive.filter(p => p.type !== effectType)
    effects.map(e => e.destroy())
  }

  /**
   * Removes and destroys **all** effects of the given negative type.
   * @param {string} effectType - The effect type to remove.
   */
  removeNegativeType (effectType) {
    const effects = this.negative.filter(n => n.type === effectType)
    this.negative = this.negative.filter(n => n.type !== effectType)
    effects.map(e => e.destroy())
  }

  /**
   * Removes and destroys all `malware` effects that are present.
   */
  cleanMalware () {
    this.removeNegativeType('RANSOM')
    this.removeNegativeType('SPYWARE')
  }

  /**
   * Removes and destroys all `hack` effects that are present.
   */
  cleanHacks () {
    this.removeNegativeType('STACK_OVERFLOW')
    this.removeNegativeType('STACK_UNDERFLOW')
    this.removeNegativeType('SQL_INJECTION')
    this.removeNegativeType('DDOS')
  }
}

export default StatusEffects;
