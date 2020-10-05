import Card from '@/classes/card/Card'
import MimicWrapper from '@/classes/card/MimicWrapper'

// The maximum number of times to try finding a random card in the players
// hand that is not already mimiced.
const MAX_TRIES = 10

/**
 * Class for the Trojan card that mimics a card in a target players hand.
 * @extends Card
 */
class Trojan extends Card {
  /**
   * Creates a new Trojan card.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (deck) {
    super(0, 'TROJAN', deck, Card.imgPath('trojan'))
  }

  /**
   * Plays the Trojan card.
   *
   * Picks a random card in the players hand to mimic. If it cannot select
   * a card that is not already mimicked the trojan card will be discarded.
   * If the player is protected from trojans the card will be discarded.
   * If the target player has a `scan` effect active the effect will be removed
   * and the trojan card discarded.
   *
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Player} playInfo.player - The player who played the trojan card.
   * @param {Player} playInfo.target - The player the Trojan is being played on.
   */
  play (playInfo) {
    if (playInfo.target.helpedBy('SCAN')) {
      this._blockedByScan(playInfo)
      this.discard()
    } else if (!playInfo.target.protectedFrom(this.type)) {
      this._mimicCard(playInfo.target.hand, playInfo.player) 
    } else {
      this.discard()
    }
  }

  /**
   * Replaces a random card in the given hand with a mimic of that card.
   *
   * Tries MAX_TRIES to find a random card that is not already mimicked. If one
   * cannot be found then no cards are replaced and the Trojan card is discarded.
   *
   * @param {Hand} hand - The hand to mimic a card in.
   * @param {Player} player - The player who played the Trojan card.
   * @private
   */
  _mimicCard (hand, player) {
    for (let i = 0; i < MAX_TRIES; i++) {
      const idx = Math.floor(Math.random() * hand.cards.length)

      if (!hand.cards[idx].isMimic) {
        hand.cards[idx] = new MimicWrapper(hand.cards[idx], this, player)
        return
      }
    }
    // could not replace a card so we discard this card
    this.discard()
  }
}

export default Trojan;
