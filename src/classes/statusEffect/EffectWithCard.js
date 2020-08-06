import StatusEffect from '@/classes/statusEffect/StatusEffect'

export default class EffectWithCard extends StatusEffect {
  constructor (card, player, turns) {
    super(card.type, player, turns)
    this.card = card
  }

  destroy () {
    this.card.discard()
  }
}



