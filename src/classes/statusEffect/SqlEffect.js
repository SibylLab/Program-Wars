import CyberAttack from '@/classes/statusEffect/CyberAttack'

const SQL_PENALTY = 2

export default class SqlEffect extends CyberAttack {
  constructor (card, playerId, attacker, method) {
    super(card, playerId, attacker)
    this.method = method
    this.method.adjustment -= SQL_PENALTY
  }

  destroy () {
    this.method.adjustment += SQL_PENALTY
    return super.destroy()
  }
}

