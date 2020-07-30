import StatusEffect from '@/classes/statusEffects/StatusEffect'
import CyberAttack from '@/classes/statusEffects/CyberAttack'
import AttackWithBonus from '@/classes/statusEffects/AttackWithBonus'

const penalties = {
  'RANSOM': 10, 'SQL_INJECTION': 2
}

const bonuses = {
  'RANSOM': 10
}

const turns = {
  'SPYWARE': 6
}

export default class EffectFactory {
  newSafetyEffect (card, playerId) {
    return new StatusEffect(card, playerId)
  }

  newAttackEffect (card, playerId, attacker) {
    let effect
    if (card.type in bonuses) {
      effect = new AttackWithBonus(card, playerId, attacker, this.getBonus(card.type))
    } else {
      effect = new CyberAttack(card, playerId, attacker)
    }

    effect.penalty = this.getPenalty(card.type)
    effect.turnsLeft = this.getTurnsLeft(card.type)
    return effect
  }

  getPenalty (type) {
    return type in penalties ? penalties[type] : 0
  }

  getBonus (type) {
    return type in bonuses ? bonuses[type] : 0
  }

  getTurnsLeft (type) {
    return type in turns ? turns[type] : -1
  }
}
