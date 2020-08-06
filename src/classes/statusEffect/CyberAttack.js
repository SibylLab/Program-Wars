import EffectWithCard from '@/classes/statusEffect/EffectWithCard.js'

export default class CyberAttack extends EffectWithCard {
  constructor (card, player, turns, attacker, penalty) {
    super(card, player, turns)
    this.attacker = attacker
    this.penalty = penalty
  }

  getPenalty () {
    return this.penalty
  }
}
