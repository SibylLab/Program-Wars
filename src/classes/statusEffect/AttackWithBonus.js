import CyberAttack from '@/classes/statusEffect/CyberAttack'

export default class AttackWithBonus extends CyberAttack {
  constructor (card, player, attacker, bonus = 0) {
    super(card, player, attacker)
    this.addBonus(bonus)
  }

  addBonus (bonus) {
    this.attacker.effects.addBonus(this.card.type, this.id, bonus)
  }

  destroy () {
    this.attacker.effects.removeBonus(this.id)
    super.destroy()
  }
}
