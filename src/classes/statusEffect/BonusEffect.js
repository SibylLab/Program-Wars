import StatusEffect from '@/classes/statusEffect/StatusEffect'

export default class BonusEffect extends StatusEffect {
  constructor (type, player, turns, amount) {
    super(type, player, turns)
    this.amount = amount
  }

  getAmount () {
    return this.amount
  }
}
