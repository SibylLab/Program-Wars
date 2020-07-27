import StatusEffect from '@/classes/statusEffects/StatusEffect.js'

export default class CyberAttack extends StatusEffect {
  constructor (type, playerId, attacker) {
    super(type, playerId)
    this.attacker = attacker
    this.penalty = 0
  }
}
