import Card from '@/classes/card/Card'
import EffectFactory from '@/classes/statusEffect/EffectFactory'

/**
 * Class for any card that only adds a negative StatusEffect to a target player.
 *
 * i.e. RANSOM, SQL_INJECTION, etc.
 * @extends Card
 */
class NegativeEffectCard extends Card {
  /**
   * Creates a new NegativeEffectCard for a given card type.
   * @param {string} type - The type of effect.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (type, deck) {
    super(0, type, deck, Card.imgPath(type.toLowerCase()))
  }

  /**
   * Plays a negative effect card.
   *
   * If the player is affected by the effect already the card will simply
   * be discarded. If the player has a scan active the card will be discarded
   * and the scan effect will be removed.
   *
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Player} playInfo.target - The target of the effect.
   * @param {Player} playInfo.player - The player that played the card.
   * @param {bool} playInfo.replaced - True if the card was replaced by a mimic,
   * otherwise `undefined`.
   * @param {Player} playInfo.attacker - The player that played the card. **Only**
   * used if the card is a replacement created by a mimicked card.
   */
  play (playInfo) {
    if (!playInfo.target.hurtBy(this.type)
        && !playInfo.target.protectedFrom(this.type)) {
      if (playInfo.target.helpedBy('SCAN')) {
        this._blockedByScan(playInfo)
        this.discard()
      } else {
        const extraTurns = playInfo.replaced ? 1 : 0
        const fact = new EffectFactory(playInfo.target)
        const attacker = playInfo.replaced ? playInfo.attacker : playInfo.player
        const effect = fact.newNegativeFromCard(this, extraTurns, attacker)
        playInfo.target.effects.addNegative(effect)
      }
    } else {
      this.discard()
    }
  }
}

export default NegativeEffectCard;
