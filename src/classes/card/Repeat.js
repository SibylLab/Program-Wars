import Card from '@/classes/card/Card'

export default class Repeat extends Card {
  constructor (value, deck) {
    super(value, 'REPEAT', deck, Card.imgPath('repeat' + value))
  }

  play ({ stack }) {
    if (!stack.isComplete()) {
      stack.player.playField.addCardToStack(this, stack)
    } else {
      this.discard()
    }
  }
}

