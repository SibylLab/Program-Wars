import Cardfrom '@/classes/card/Card'

export default CardWrapper extends Card {
  constructor (card) {
    super(card.value, card.owner)
    this.card = card
  }

  discards () {
    return [this.card]
  }
}
