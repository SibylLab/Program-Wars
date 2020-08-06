import CyberAttack from '@/classes/statusEffect/CyberAttack'

const SQL_PENALTY = 2

export default class SqlEffect extends CyberAttack {
  constructor (card, player, attacker) {
    super(card, player, attacker)
    this.method = this.player.playField.method
    this.method.adjustment -= SQL_PENALTY
  }

  destroy () {
    this.method.adjustment += SQL_PENALTY
    super.destroy()
  }
}

