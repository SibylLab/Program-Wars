import StatusEffect from '@/classes/statusEffect/StatusEffect'

/**
 * Class for bonus effects that should not be displayed on the player.
 * @extends StatusEffect
 */
class InvisibleBonusEffect extends StatusEffect {
  /**
   * Creates a new InvisibleBonusEffect.
   * @param {Card} card - The card that created the attack.
   * @param {Player} player - The player the effect is added to.
   * @param {int} turns - The turns the effect will last, -1 for permanent.
   * @param {int} amount - The point value of the bonus.
   */
  constructor (type, player, turns, amount) {
    super(type, player, turns, false)
    this.amount = amount
  }

  /**
   * Returns the effect's bonus.
   * @return The bonus amount.
   */
  getBonus () {
    return this.amount
  }
}

export default InvisibleBonusEffect;
