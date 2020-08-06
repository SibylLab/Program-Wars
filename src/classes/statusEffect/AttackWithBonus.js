import CyberAttack from '@/classes/statusEffect/CyberAttack'

export default class AttackWithBonus extends CyberAttack {
  constructor (card, player, turns, attacker, penalty, bonusEffect) {
    super(card, player, turns, attacker, penalty)
    this.bonusEffect = bonusEffect
    this.attacker.effects.addPositive(bonusEffect)
  }

  destroy () {
    super.destroy()
    this.attacker.effects.removeEffect(this.bonusEffect)
  }
}
