import CyberAttack from '@/classes/statusEffect/CyberAttack'

/**
 * Class for a StatusEffect specifically for `SQL_INJECTION`.
 * @prop {MethodStack} method - The method stack being affected.
 * @extends CyberAttack
 */
class SqlEffect extends CyberAttack {
  /**
   * Creates a new SqlEffect and adds its penalty as an adjustment to the
   * target players method.
   * @param {Card} card - The card that created the attack.
   * @param {Player} player - The player the effect is added to.
   * @param {int} turns - The turns the effect will last, -1 for permanent.
   * @param {Player} attacker - The player that played the attack.
   * @param {int} penalty - The value of the penalty.
   */
  constructor (card, player, turns, attacker, penalty) {
    super(card, player, turns, attacker, penalty)
    this.method = this.player.playField.method
    this.method.adjustment += this.penalty
  }

  /**
   * Destroy the effect and remove the adjustemnt from the affected method.
   */
  destroy () {
    super.destroy()
    this.method.adjustment -= this.penalty
  }
}

export default SqlEffect;
