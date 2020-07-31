import Deck from '@/classes/deck/Deck'
import AgileDeck from '@/classes/deck/AgileDeck'
import deckData from '@/classes/deck/deckData'

export default class DeckFactory {
  begginerDeck (type) {
    if (type in deckData.begginer) {
      const data = deckData.beginner[type]
      return new Deck(this._merge(data.base, data.extra))
    } else {
      return new Deck(deckData.begginer.default)
    }
  }

  standardDeck (type) {
    if (type in deckData.standard) {
      const data = deckData.standard[type]
      return new Deck(this._merge(data.base, data.extra))
    } else {
      return new Deck(deckData.standard.default)
    }
  }

  agileDeck (type) {
    if (type in deckData.agile) {
      const data = deckData.agile[type]
      return new AgileDeck(this._merge(data.base, data.extra))
    } else {
      return new AgileDeck(deckData.agile.default)
    }
  }

  _merge (baseCards, extraCards) { 
    return baseCards.concat(extraCards)
  }
}
