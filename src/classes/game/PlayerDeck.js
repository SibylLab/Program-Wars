import Card from '@/classes/game/Card'

export default class PlayerDeck {
  constructor (playerId) {
    this.playerId = playerId
    this.cards = [],
    this.discard = []
  }

  addCards (cardsToAdd) {
    for (let {type, value} of cardsToAdd) {
      this.cards.push(new Card(type, value))
    }
  }

  draw () {
    return cards.pop()
  }

  shuffle (numShuffles) {
    for (let times = 0; times < numShuffles; times++) {
      for (let i = this.cards.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]]
      }
    }
  }
}

