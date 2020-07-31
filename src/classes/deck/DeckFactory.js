import Deck from '@/classes/deck/Deck'
import AgileDeck from '@/classes/deck/AgileDeck'
import decks from '@/classes/deck/deckData'

export default class DeckFactory {
  begginerDeck (type) {
    if (type in decks.begginer) {
      const data = decks.beginner[type]
      return new Deck(this._merge(data.base, data.extra))
    } else {
      return new Deck(deck.begginer.default)
    }
  }

  standardDeck (type) {
    if (type in decks.standard) {
      const data = decks.standard[type]
      return new Deck(this._merge(data.base, data.extra))
    } else {
      return new Deck(deck.standard.default)
    }
  }

  agileDeck (type) {
    if (type in decks.agile) {
      const data = decks.agile[type]
      return new AgileDeck(this._merge(data.base, data.extra))
    } else {
      return new AgileDeck(deck.agile.default)
    }
  }

  _merge (baseCards, extraCards) { 
    return baseCards.concat(extraCards)
  }
}
