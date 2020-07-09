export default class PlayerDeck {
  constructor (type) {
    this.cards = [],
    this.discard = []
  }

  addCards (cardsToAdd) {
    for (let [type, values] of Object.entries(cardsToAdd)) {
      for (let [value, number] of Object.entries(values)) {
        for (let i = 0; i < number; i++) {
          this.cards.push(new Card(type, parseInt(value)))
        }
      }
    }
  }

  draw () {
    return cards.pop()
  }

  shuffle (numShuffles) {
    for (let times = 0; times < numShuffles; times++) {
      for (let i = this.cards.length; i; i--) {
        let j = Math.floor(Math.random() * i)
        [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]]
      }
    }
  }
}

