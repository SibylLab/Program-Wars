import Deck from '@/classes/deck/Deck'
import deckData from '@/classes/deck/deckData'

export default class DeckFactory {
  beginnerDeck (type) {
    let data
    if (type in deckData.beginner) {
      data = deckData.beginner[type]
    } else {
      data = deckData.beginner.default
    }
    return new Deck(this._merge(data.base, data.extra))
  }

  standardDeck (type) {
    let data
    if (type in deckData.standard) {
      data = deckData.standard[type]
    } else {
      data = deckData.standard.default
    }
    return new Deck(this._merge(data.base, data.extra))
  }

  _merge (baseCards, extraCards) { 
    return baseCards.concat(extraCards)
  }
}
