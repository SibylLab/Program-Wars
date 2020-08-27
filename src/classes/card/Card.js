import { isAttack } from '@/classes/card/cardData'

// Function to create a unique object id
const uuidV1 = require('uuid/v1')

/**
 * A Base Class representing a game Card.
 *
 * This class is **not intended to be used directly**. Each card type should be a
 * subclass that, at minimum, implement the `play` method as necessary
 * for that particular card.
 *
 * @property {string} id - A unique ID for the card.
 * @property {bool} isMimic - True if the card is mimicing another card.
 * @property {bool} isExtra - True if the card was created by another card
 * or effect and should not go back into a deck.
 */
class Card {
  /**
   * Create a new Card.
   * @param {int} value - The cards value.
   * @param {string} type - The type of the card, should be all caps i.e. `"METHOD"`.
   * @param {Deck} value - The deck the card is in.
   * @param {string} image - The image path for the card.
   */
  constructor (value, type, deck, image) {
    this.value = value
    this.type = type
    this.deck = deck
    this.image = image
    this.id = uuidV1()
    this.isMimic = false
    this.isExtra = false
  }

  /**
   * Creates an image path from a given card name.
   *
   * Generally, this is a lowercase version of the card's type followed
   * by the cards value if the card type has different images for each value.
   * i.e. `"method"` or `"instruction2"`
   *
   * @param {string} cardName - The name used by the card file.
   * @return {string} A path to the file for a card with the given cardName.
   */
  static imgPath (cardName) {
    return 'static/cardImages/' + cardName + '.png'
  }

  /**
   * Get the cards value.
   * @return {int} The value of the card.
   */
  getValue () {
    return this.value
  }

  /**
   * Plays the card using given play information.
   *
   * **Should be overriden** in subclasses because by default this method just
   * discards the card.
   *
   * @param {Object} playInfo - Information needed to play the card. This will
   * be determined by the card type and what it needs to be played.
   */
  play (playInfo) { // eslint-disable-line no-unused-vars
    this.discard()
  }

  /**
   * Puts a card into the discard pile of the deck it is from.
   *
   * Does not discard `extra` cards.
   */
  discard () {
    if (!this.isExtra) {
      this.deck.discard(this)
    }
  }

  /**
   * Takes care of removing a SCAN effect from the targeted player.
   *
   * Sets playInfo.scanned to be true.
   *
   * @param {Object} playInfo - The information object for the play that involves
   * this card.
   * @private
   */
  _blockedByScan (playInfo) {
    if (isAttack(this.type)) {
      playInfo.scanned = true
      if (this.type === 'VIRUS') {
        playInfo.stack.player.effects.removePositiveType('SCAN')
      } else { 
        playInfo.target.effects.removePositiveType('SCAN')
      }
    }
  }
}

export default Card;
