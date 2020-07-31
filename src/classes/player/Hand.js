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

  addCard (card) {
    this.cards.push(card)
  }

  addCards (cards) {
    for (const card of cards) {
      this.addCard(card)
    }
  }

  removeCard (card) {
    this.cards = this.cards.filter(c => c !== card)
  }

  removeCards (cards) {
    for (const card of cards) {
      this.removeCard(card)
    }
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
