import CyberAttack from '@/classes/statusEffect/CyberAttack'

/**
 * Class for attacks that give the attacker a bonus.
 * @extends CyberAttack
 */
class AttackWithBonus extends CyberAttack {
  /**
   * Creates a new CyberAttack and adds the given BonusEffect to the attacker.
   * @param {Card} card - The card that created the attack.
   * @param {Player} player - The player the effect is added to.
   * @param {int} turns - The turns the effect will last, -1 for permanent.
   * @param {Player} attacker - The player that played the attack.
   * @param {int} penalty - The value of the penalty.
   * @param {InvisibleBonusEffect} bonusEffect - The bonus effect to give the attacker.
   */
  constructor (card, player, turns, attacker, penalty, bonusEffect) {
    super(card, player, turns, attacker, penalty)
    this.bonusEffect = bonusEffect
    this.attacker.effects.addPositive(bonusEffect)
  }

  /**
   * Destroys the effect and removes the bonus effect from the attacker.
   */
  destroy () {
    super.destroy()
    this.attacker.effects.removeEffect(this.bonusEffect)
  }
}

export default AttackWithBonus;
