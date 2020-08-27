import StatusEffect from '@/classes/statusEffect/StatusEffect'

/**
 * Class for status effects that came from a Card.
 * @extends StatusEffect
 */
class EffectWithCard extends StatusEffect {
  /**
   * Creates a new EffectWithCard.
   * @param {Card} card - The card that created the attack.
   * @param {Player} player - The player the effect is added to.
   * @param {int} turns - The turns the effect will last, -1 for permanent.
   */
  constructor (card, player, turns) {
    super(card.type, player, turns)
    this.card = card
  }

  /**
   * Destroys the effect and discards its card.
   */
  destroy () {
    super.destroy()
    this.card.discard()
  }
}

export default EffectWithCard;
