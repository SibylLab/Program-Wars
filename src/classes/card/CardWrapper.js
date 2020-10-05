import Card from '@/classes/card/Card'

/**
 * A Base class for wrapping a card.
 * This class is not intended to be used directly, but should be used in
 * subclasses that need to wrap a card to add functionality to it.
 * i.e. Method cards need to be wrapped so to keep track of the MethodStack
 * that they get their points from.
 * @extends Card
 */
class CardWrapper extends Card {
  /**
   * Create a new wrapper around the given card.
   * @param {Card} card - The card to wrap.
   */
  constructor (card) {
    super(card.value, card.type, card.deck, card.image)
    this.card = card
  }

  /**
   * Discards the wrapped card.
   */
  discard () {
    this.card.discard()
  }

  /**
   * Plays the wrapped card.
   * @param {Object} playInfo - Information about how the card was played.
   */
  play (playInfo) {
    this.card.play(playInfo)
  }
}

export default CardWrapper;
