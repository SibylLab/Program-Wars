export default class AttackWithBonus {
  constructor (type, playerId, attacker, bonus = 0) {
    super(type, playerId, attacker)
    this.addBonus(bonus)
  }

  addBonus () {
    this.attacker.effects.addBonus(this.type, this.id, this.bonus)
  }

  destroy () {
    this.attacker.effects.removeBonus(this.id)
  }
}
