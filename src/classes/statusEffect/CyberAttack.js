import StatusEffect from '@/classes/statusEffect/StatusEffect.js'

export default class CyberAttack extends StatusEffect {
  constructor (card, player, attacker) {
    super(card, player)
    this.attacker = attacker
    this.penalty = 0
  }
}
