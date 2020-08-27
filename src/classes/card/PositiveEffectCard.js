import Card from '@/classes/card/Card'
import EffectFactory from '@/classes/statusEffect/EffectFactory'

/**
 * Class for any card that only adds a poitive StatusEffect to a player.
 *
 * i.e. ANTIVIRUS and FIREWALL. **Not** for SCAN.
 * @extends Card
 */
class PositiveEffectCard extends Card {
  /**
   * Creates a new PositiveEffectCard for a given card type.
   * @param {string} type - The type of effect.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (type, deck) {
    super(0, type, deck, Card.imgPath(type.toLowerCase()))
  }

  /**
   * Plays the positive effect on a target player.
   *
   * Effects like Antivirus and Firewall will remove effects they block.
   * If the player is already helped by the effect the card will simply be discarded.
   *
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Player} playInfo.target - The player the effect is being added to.
   */
  play ({ target }) {
    if (!target.helpedBy(this.type)) {
      const fact = new EffectFactory(target)
      target.effects.addPositive(fact.newPositiveFromCard(this, 1))

      if (this.type === 'ANTIVIRUS') {
        target.hand.cleanMimics()
        target.playField.cleanViruses()
        target.effects.cleanMalware()
      } else if (this.type === 'FIREWALL') {
        target.effects.cleanHacks()    
      }
    } else {
      this.discard()
    }
  }
}

export default PositiveEffectCard;
