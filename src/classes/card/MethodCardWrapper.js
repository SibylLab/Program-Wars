import CardWrapper from '@/classes/card/CardWrapper'

export default class MethodCardWrapper extends Card {
  constructor (card, method) {
    super(card.value, card.ownerId)
    this.card = card
    this.method = method
  }

  getValue () {
    return method.getScore()
  }
}

