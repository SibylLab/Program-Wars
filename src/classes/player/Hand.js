const MAX_CARDS = 5

export default class Hand {
  constructor (playerId) {
    this.playerId = playerId
    this.maxCards = MAX_CARDS
    this.cards = []
  }

  numCards () {
    return this.cards.length
  }

  getCardById (cardId) {
    return this.cards.find(c => c.id === cardId)
  }

  getCardAt (idx) {
    return this.cards[idx]
  }

  addCards (cards) {
    for (const card of cards) {
      this.addCard(card)
    }
  }

  addCard (card) {
    this.cards.push(card)
  }

  takeAll () {
    const cards = this.cards
    this.cards = []
    return cards
  }

  removeCards (cards) {
    for (const card of cards) {
      this.removeCard(card)
    }
  }

  removeCard (card) {
    this.cards = this.cards.filter(c => c !== card)
  }

  cleanMimics () {
    const mimics = this.getMimics()
    this.cards = this.cards.filter(c => !c.isMimic)
    return mimics
  }

  getMimics () {
    return this.cards.filter(c => c.isMimic)
  }
}
