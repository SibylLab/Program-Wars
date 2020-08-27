import EffectWithCard from '@/classes/statusEffect/EffectWithCard.js'

/**
 * Class for CyberAttack status effects created by an attack card.
 * @extends EffectWithCard
 */
class CyberAttack extends EffectWithCard {
  /**
   * Creates a new CyberAttack effect.
   * @param {Card} card - The card that created the attack.
   * @param {Player} player - The player the effect is added to.
   * @param {int} turns - The turns the effect will last, -1 for permanent.
   * @param {Player} attacker - The player that played the attack.
   * @param {int} penalty - The value of the penalty.
   */
  constructor (card, player, turns, attacker, penalty) {
    super(card, player, turns)
    this.attacker = attacker
    this.penalty = penalty
  }

  /**
   * Returns the value of the effect's penalty.
   * @return {int} The value of the penalty.
   */
  getPenalty () {
    return this.penalty
  }
}

export default CyberAttack;
