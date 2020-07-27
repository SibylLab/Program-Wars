import StatusEffect from '@/classes/statusEffects/StatusEffect'
import CyberAttack from '@/classes/statusEffects/CyberAttack'
import AttackWithBonus from '@/classes/statusEffects/AttackWithBonus'

const penalties = {
  'RANSOM': 10, 'SQL_INJECTION': 2
}

const bonuses = {
  'RANSOM': 10, 'SPY': 0
}

export default class EffectFactory {
  newSafetyEffect (type, playerId) {
    return new StatusEffect(type, player)
  }

  newAttackEffect (type, playerId, attacker) {
    let effect
    if (type in bonuses) {
      effect = new AttackWithBonus(type, playerId, attacker, this.getBonus(type))
      effect.penalty = this.getPenalty(type)
    } else {
      effect = new CyberAttack(type, playerId, attacker)
      effect.penalty = this.getPenalty(type)
    }
    return effect
  }

  getPenalty (type) {
    return type in penalties ? penalties[type] : 0
  }

  getBonuses (type) {
    return type in bonuses ? bonuses[type] : 0
  }
}
