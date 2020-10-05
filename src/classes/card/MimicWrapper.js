import CardWrapper from '@/classes/card/CardWrapper'
import NegativeEffectCard from '@/classes/card/NegativeEffectCard'
import Virus from '@/classes/card/Virus'
import { isBase, isAttack } from '@/classes/card/cardData'

/**
 * Class to wrap a card that has been mimicked by a Trojan card.
 * @extends CardWrapper
 */
class MimicWrapper extends CardWrapper {
  /**
   * Creates a new card that mimics the given card.
   * @param {Card} card - The card being mimicked.
   * @param {Trojan} trojan - The Trojan card that is caused the effect.
   * @param {Player} player - The player who played the Trojan.
   */
  constructor (card, trojan, player) {
    super(card)
    this.trojan = trojan
    this.player = player
    this.isMimic = true
  }

  /**
   * Discards the mimicked card and the Trojan card.
   */
  discard () {
    super.discard()
    this.trojan.discard()
  }

  /**
   * Plays the appropriate replacement for the mimicked card.
   *
   * **Modifies playInfo**
   * ```
   * playInfo.target = playInfo.player // replacement targets player that played the mimic
   * playInfo.attacker = this.player // the player that played the Trojan
   * playInfo.replaced = true // inicates the card played was a replacement
   * ```
   *
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Player} playInfo.player - The player who played the mimicked card.
   */
  play (playInfo) {
    const replacement = this._replace()
    playInfo.target = playInfo.player
    playInfo.attacker = this.player
    playInfo.replaced = true
    replacement.play(playInfo)
    this.discard()
  }

  /**
   * Returns a the appropriate replacement card for the mimicked card.
   * The returned card is an Extra card. i.e. card.isExtra = true.
   * @return {Card} The card that replaces the mimicked card.
   * @private
   */
  _replace () {
    let card
    if (this.card.type === 'REPEAT' || this.card.type === 'VARIABLE') {
      card = new Virus()
    } else if (isBase(this.card.type)) {
      card = new NegativeEffectCard('STACK_OVERFLOW')
    } else if (isAttack(this.card.type)) {
      card = new NegativeEffectCard('STACK_UNDERFLOW')
    } else {
      card = new NegativeEffectCard('RANSOM')
    }
    card.isExtra = true
    return card
  }
}

export default MimicWrapper;
