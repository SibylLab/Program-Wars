import Cardfrom '@/classes/card/Card'

export default class CardWrapper extends Card {
  constructor (card) {
    super(card.value, card.owner)
    this.card = card
  }

  getDiscards () {
    return [this.card]
  }
}
