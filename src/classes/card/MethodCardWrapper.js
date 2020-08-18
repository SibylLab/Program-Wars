import CardWrapper from '@/classes/card/CardWrapper'

export default class MethodCardWrapper extends CardWrapper {
  constructor (card, method) {
    super(card)
    this.method = method
  }

  getValue () {
    return this.method.getScore()
  }
}

