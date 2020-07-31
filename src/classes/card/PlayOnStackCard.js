import Card from '@/classes/card/Card'

export default class PlayOnStackCard extends Card {
  constructor (value, type, ownerId = -1) {
    super(value, ownerId)
    this.type = type
    this.image = this._makeImage(type.toLowerCase() + value)
  }

  play ({stack, card}) {
    stack.addCard(card)
  }
}

