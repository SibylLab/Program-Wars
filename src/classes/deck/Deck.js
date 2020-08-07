import CardFactory from '@/classes/card/CardFactory'

export default class Deck {
  constructor (cardTypes) {
    this.cards = []
    this.discardPile = []
    this._addCardTypes(cardTypes)
    this.shuffle()
  }

  draw () {
    if (this.cards.length === 0) {
      this.refresh()
      if (this.cards.length === 0) {
        return null
      }
    }
    return this.cards.shift()
  }

  drawCards (numCards) {
    const drawn = []
    for (let i = 0; i < numCards; i++) {
      const card = this.draw()
      if (card) {
        drawn.push(card)
      } else {
        break
      }
    }
    return drawn
  }

  takeCardAt (idx) {
    const card = this.cards[idx]
    this.removeCard(card)
    return card
  }

  removeCard (card) {
    this.cards = this.cards.filter(c => c !== card)
  }

  refresh () {
    this._shuffleCards(this.discardPile)
    this.cards = this.cards.concat(this.discardPile)
    this.discardPile = []
  }

  putCardOnTop (card) {
    this.cards.unshift(card)
  }

  addCardsToTop (cards) {
    cards.map(c => this.putCardOnTop(c))
  }

  discard (card) {
    this.discardPile.push(card)
  }

  shuffle (times = 3) {
    for (let i = 0; i < times; i++) {
      this._shuffleCards(this.cards)
    }
  }

  _addCardTypes (cardTypes) {
    const fact = new CardFactory()
    for (const {type, val, num} of cardTypes) {
      for (let i = 0; i < num; i++) {
        this.cards.push(fact.newCard(type, val, this))
      }
    }
  }

  /**
   * Shuffle a list of cards into a psuedo random order.
   * @param cards An array of Cards to shuffle.
   */
  _shuffleCards (cards) {
    for (let i = cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]]
    }
  }
}
