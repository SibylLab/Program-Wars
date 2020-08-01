import CardFactory from '@/classes/card/CardFactory'

const NUM_SHUFFLES = 4

export default class Deck {
  constructor (cardTypes) {
    this.cards = []
    this.discard = []
    this._addCards(cardTypes)
    this.shuffle(NUM_SHUFFLES)
  }

  draw () {
    if (this.cards.length === 0) {
      this.cards = this.cards.concat(this.discard)
      this.discard = []
    }
    return this.cards.shift()
  }

  discard (card) {
    this.discard.push(card)
  }

  shuffle (times) {
    for (let i = 0; i < times; i++) {
      this._shuffleCards(this.cards)
    }
  }

  _addCards (cardTypes) {
    const fact = new CardFactory()
    for (const {type, val, num} of cardTypes) {
      for (let i = 0; i < num; i++) {
        this.cards.push(fact.newCard(type, val))
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
