import StatusEffect from '@/classes/statusEffect/StatusEffect'
import CyberAttack from '@/classes/statusEffect/CyberAttack'
import AttackWithBonus from '@/classes/statusEffect/AttackWithBonus'
import SqlEffect from '@/classes/statusEffect/SqlEffect'
import CoolDown from '@/classes/statusEffect/CoolDown'

const penalties = {
  'RANSOM': 10
}

const bonuses = {
  'RANSOM': 10
}

// spyware and redraw add +1 as they are updated once the turn they are played
const turns = {
  'SPYWARE': 6, 'STACK_OVERFLOW': 2, 'STACK_UNDERFLOW': 2, 'DDOS': 3,
  'REDRAW_CD': 3
}

export default class EffectFactory {
  constructor (player) {
    this.player = player
  }

  newSafetyEffect (card) {
    return new StatusEffect(card, this.player)
  }

  newAttackEffect (card, attacker) {
    let effect
    if (card.type in bonuses) {
      effect = new AttackWithBonus(card, this.player, attacker, this._getBonus(card.type))
    } else {
      effect = new CyberAttack(card, this.player, attacker)
    }

    effect.penalty = this._getPenalty(card.type)
    effect.turnsLeft = this._getTurnsLeft(card.type)
    return effect
  }

  newSqlEffect (card, attacker) {
    return new SqlEffect(card, this.player, attacker)
  }

  newCoolDown (type) {
    return new CoolDown(type, this._getTurnsLeft(type), this.player)
  }

  _getPenalty (type) {
    return type in penalties ? penalties[type] : 0
  }

  _getBonus (type) {
    return type in bonuses ? bonuses[type] : 0
  }

  _getTurnsLeft (type) {
    return type in turns ? turns[type] : -1
  }
}
