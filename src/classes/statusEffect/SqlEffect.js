import CyberAttack from '@/classes/statusEffect/CyberAttack'

export default class SqlEffect extends CyberAttack {
  constructor (card, player, turns, attacker, penalty) {
    super(card, player, turns, attacker, penalty)
    this.method = this.player.playField.method
    this.method.adjustment += this.penalty
  }

  destroy () {
    super.destroy()
    this.method.adjustment -= this.penalty
  }
}

