import StatusEffect from '@/classes/statusEffect/StatusEffect'

export default class InvisibleBonusEffect extends StatusEffect {
  constructor (type, player, turns, amount) {
    super(type, player, turns, false)
    this.amount = amount
  }

  getBonus () {
    return this.amount
  }
}
