import StatusEffect from '@/classes/statusEffect/StatusEffect'
import EffectWithCard from '@/classes/statusEffect/EffectWithCard'
import CyberAttack from '@/classes/statusEffect/CyberAttack'
import AttackWithBonus from '@/classes/statusEffect/AttackWithBonus'
import InvisibleBonusEffect from '@/classes/statusEffect/InvisibleBonusEffect'
import SqlEffect from '@/classes/statusEffect/SqlEffect'

// Map from effect types to their penalty points (if they have them)
const penalties = {
  'RANSOM': -10, 'SQL_INJECTION': -2
}

// Map from effect types to their bonus points (if they have them)
const bonuses = {
  'RANSOM': 10
}

// Map from effect types to how many turns they last (if they are temporary)
// spyware adds +1 as it updates once before you can use its effect
const turns = {
  'SPYWARE': 6, 'STACK_OVERFLOW': 2, 'STACK_UNDERFLOW': 2, 'DDOS': 3,
  'REDRAW_CD': 3
}

/**
 * Factory class to create statusEffects
 */
class EffectFactory {
  /**
   * Creates a new effect factory.
   * @param {Player} player - The player the effects will be added to.
   */
  constructor (player) {
    this.player = player
  }

  /**
   * Creates a new statusEffect for effects that do not come from cards.
   *
   * @param {String} type - The type of the effect.
   * @param {int} extraTurns - Additional turns to add to the effect length.
   * If the effect should be permanent this is ignored.
   * @param {bool} [hasImage=true] - True if the effect has an image.
   * See {@link StatusEffect}.
   * @return {StatusEffect} The new status effect.
   */
  newEffect (type, extraTurns, hasImage = true) {
    const turns = this._getTurns(type, extraTurns)
    return new StatusEffect(type, this.player, turns, hasImage)
  }

  /**
   * Creates a positive StatusEffect that comes from a card like `antivirus`.
   *
   * @param {Card} card - The card that creates the effect.
   * @param {int} extraTurns - The additional turns to add to the effect duration.
   * If the effect should be permanent this is ignored.
   * @return {EffectWithCard} The new status effect.
   */
  newPositiveFromCard (card, extraTurns) {
    const turns = this._getTurns(card.type, extraTurns)
    return new EffectWithCard(card, this.player, turns)
  }

  /**
   * Creates a new negative StatusEffect that comes from an attack card like `ransom`.
   *
   * @param {Card} card - The card that creates the effect.
   * @param {int} extraTurns - The additional turns to add to the effect duration.
   * If the effect should be permanent this is ignored.
   * @param {Player} attacker - The player that played the card.
   * @return {CyberAttack} The new status effect.
   */
  newNegativeFromCard (card, extraTurns, attacker) {
    const turns = this._getTurns(card.type, extraTurns)
    const penalty = this._getPenalty(card.type)
    const bonus = this._getBonus(card.type)

    if (card.type === 'SQL_INJECTION') {
      return new SqlEffect(card, this.player, turns, attacker, penalty)
    } else if (bonus !== 0) {
      const bonusEffect = new InvisibleBonusEffect(card.type, this.player, turns, bonus)
      return new AttackWithBonus(card, this.player, turns, attacker, penalty, bonusEffect)
    } else {
      return new CyberAttack(card, this.player, turns, attacker, penalty)
    }
  }

  /**
   * Get the penalty amount for the given type.
   * Returns 0 if the type has no penalty.
   * @private
   */
  _getPenalty (type) {
    return type in penalties ? penalties[type] : 0
  }

  /**
   * Get the bonus amount for the given type.
   * Returns 0 if the type has no bonus.
   * @private
   */
  _getBonus (type) {
    return type in bonuses ? bonuses[type] : 0
  }

  /**
   * Get the number of turns for the effect.
   * Returns -1 if the effect is permanent, even if there are extra turns given.
   * @private
   */
  _getTurns (type, extraTurns) {
    if (type in turns) {
      return turns[type] + extraTurns
    } else {
      return -1
    }
  }
}

export default EffectFactory;
