import Card from '@/classes/card/Card'

export default class CardWrapper extends Card {
  constructor (card) {
    super(card.value, card.type, card.image, card.ownerId)
    this.card = card
  }

  getDiscards () {
    return this.card.getDiscards()
  }
}
