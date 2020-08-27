import Card from '@/classes/card/Card'
import EffectFactory from '@/classes/statusEffect/EffectFactory'

/**
 * Class for the Scan card.
 * @extends Card
 */
class Scan extends Card {
  /**
   * Creates a new scan card.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (deck) {
    super(0, 'SCAN', deck, Card.imgPath('scan'))
  }

  /**
   * Plays the Scan card.
   *
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Player} playInfo.player - The player who played the scan card.
   * @param {Player|Stack|StatusEffect|Card} target - The target of the scan effect.
   * The type will be indicated by targetEffect.
   * @param {string} targetType - A string indicating what the scan is targeting.
   * `player` we are adding a scan effect to the target. `stack` we are cleaning
   * a virus from the target stack. `mimic` we are removing a target card from
   * the player's hand. `effect` we are removing a target negative effect from
   * the player.
   */
  play ({ player, target, targetType }) {
    if (targetType === 'player' && this._canAddScan(target)) {
      const fact = new EffectFactory(target)
      target.effects.addPositive(fact.newPositiveFromCard(this, 0))
      return
    }

    if (targetType === 'stack') {
      target.popTop().discard()
    } else if (targetType === 'mimic') {
      player.hand.removeCard(target)
      target.discard()
    } else if (targetType === 'effect') {
      player.effects.removeEffect(target)
    }
    this.discard()
  }

  /**
   * Checks if a scan card can be added to the player.
   * @return {bool} True if the player has no viruses, mimics, or negative effects,
   * otherwise false.
   * @private
   */
  _canAddScan (target) {
    const attacks = target.getAllAttacks()
    return attacks.virusStacks.length === 0 && attacks.effects.length === 0
        && attacks.mimics.length === 0
  }
}

export default Scan;
