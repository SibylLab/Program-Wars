import Deck from '@/classes/deck/Deck'
import AgileDeck from '@/classes/deck/AgileDeck'
import deckData from '@/classes/deck/deckData'

export default class DeckFactory {
  begginerDeck (type) {
    let data
    if (type in deckData.begginer) {
      data = deckData.beginner[type]
    } else {
      data = deckData.begginer.default
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

  agileDeck (type) {
    let data
    if (type in deckData.agile) {
      data = deckData.agile[type]
    } else {
      data = deckData.agile.default
    }
    return new AgileDeck(this._merge(data.base, data.extra))
  }

  _merge (baseCards, extraCards) { 
    return baseCards.concat(extraCards)
  }
}
