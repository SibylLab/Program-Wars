import Card from '@/classes/card/Card'

export default class Repeat extends Card {
  constructor (value, deck) {
    super(value, 'REPEAT', deck, Card.imgPath('repeat' + value))
  }

  play ({stack, stackOwner}) {
    if (!stack.isComplete()) {
      stackOwner.playField.addCardToStack(this, stack)
    } else {
      this.discard()
    }
  }
}

