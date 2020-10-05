import Card from '@/classes/card/Card'

/**
 * Class for the Search card that can search the top N cards of a Deck.
 * 
 * N is **10** and can be obtained through `getValue()`.
 * @extends Card
 */
class Search extends Card {
  /**
   * Creates a new Search card.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (deck) {
    super(10, 'SEARCH', deck, Card.imgPath('search'))
  }

  /**
   * Plays the Search card.
   *
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Player} playInfo.player - The player who played the scan card.
   * @param {Card} playInfo.chosenCard - The card that was selected during
   * the search.
   * @param {Deck} playInfo.deck - The deck that was being searched for the
   * card. May be different from the deck the Search card is in.
   */
  play ({ player, chosenCard, deck }) {
    player.hand.addCard(chosenCard)
    deck.removeCard(chosenCard)
    deck.shuffle()
    this.discard()
  }
}

export default Search;

