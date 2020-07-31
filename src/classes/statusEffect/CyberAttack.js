import StatusEffect from '@/classes/statusEffects/StatusEffect.js'

export default class CyberAttack extends StatusEffect {
  constructor (card, playerId, attacker) {
    super(card, playerId)
    this.attacker = attacker
    this.penalty = 0
  }
}
