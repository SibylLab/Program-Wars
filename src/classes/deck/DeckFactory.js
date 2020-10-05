import Deck from '@/classes/deck/Deck'
import deckData from '@/classes/deck/deckData'

/**
 * Factory class to create decks for different modes
 */
class DeckFactory {
  /**
   * Creates a new beginner deck from a given deck type.
   * @param {string} type - The type of deck to create.
   * @return {Deck} A new deck with cards determined by the given type.
   */
  beginnerDeck (type) {
    let data
    if (type in deckData.beginner) {
      data = deckData.beginner[type]
    } else {
      data = deckData.beginner.default
    }
    return new Deck(data.base.concat(data.extra))
  }

  /**
   * Creates a new standard deck from a given deck type.
   * @param {string} type - The type of deck to create.
   * @return {Deck} A new deck with cards determined by the given type.
   */
  standardDeck (type) {
    let data
    if (type in deckData.standard) {
      data = deckData.standard[type]
    } else {
      data = deckData.standard.default
    }
    return new Deck(data.base.concat(data.extra))
  }
}

export default DeckFactory;
