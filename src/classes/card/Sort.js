import Card from '@/classes/card/Card'

/**
 * Class for the Sort card that sorts the top N cards of the deck.
 *
 * N is **5** and can be obtained through `getValue()`.
 * @extends Card
 */
export default class Sort extends Card {
  /**
   * Creates a new Sort card.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (deck) {
    super(5, 'SORT', deck, Card.imgPath('sort'))
  }

  /**
   * Plays the Sort card.
   *
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Card[]} sortedCards - The sorted cards. The first card will be
   * the top once the cards are placed back on the deck.
   * @param {Deck} playInfo.deck - The deck that was being searched for the
   * card. May be different from the deck the Sort card is in.
   */
  play ({ sortedCards, deck }) {
    sortedCards.reverse()
    deck.addCardsToTop(sortedCards)
    this.discard()
  }
}


