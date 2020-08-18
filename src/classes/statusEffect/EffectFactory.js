import StatusEffect from '@/classes/statusEffect/StatusEffect'
import EffectWithCard from '@/classes/statusEffect/EffectWithCard'
import CyberAttack from '@/classes/statusEffect/CyberAttack'
import AttackWithBonus from '@/classes/statusEffect/AttackWithBonus'
import InvisibleBonusEffect from '@/classes/statusEffect/InvisibleBonusEffect'
import SqlEffect from '@/classes/statusEffect/SqlEffect'

const penalties = {
  'RANSOM': -10, 'SQL_INJECTION': -2
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

  newEffect (type, extraTurns, hasImage = true) {
    const turns = this._getTurns(type, extraTurns)
    return new StatusEffect(type, this.player, turns, hasImage)
  }

  newPositiveFromCard (card, extraTurns) {
    const turns = this._getTurns(card.type, extraTurns)
    return new EffectWithCard(card, this.player, turns)
  }

  newNegativeFromCard (card, extraTurns, attacker) {
    const turns = this._getTurns(card.type, extraTurns)
    const penalty = this._getPenalty(card.type)
    const bonus = this._getBonus(card.type)

    if (card.type === 'SQL_INJECTION') {
      return new SqlEffect(card, this.player, turns, attacker, penalty)
    } else if (bonus !== 0) {
      const bonusEffect = new InvisibleBonusEffect(card.type, this.player, turns, bonus)
      return new AttackWithBonus(card, this.player, turns, attacker, penalty, bonusEffect)
    } else {
      return new CyberAttack(card, this.player, turns, attacker, penalty)
    }
  }

  _getPenalty (type) {
    return type in penalties ? penalties[type] : 0
  }

  _getBonus (type) {
    return type in bonuses ? bonuses[type] : 0
  }

  _getTurns (type, extraTurns) {
    if (type in turns) {
      return turns[type] + extraTurns
    } else {
      return -1
    }
  }
}
