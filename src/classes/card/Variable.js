import Card from '@/classes/card/Card'

export default class Variable extends Card {
  constructor (value, deck) {
    super(value, 'VARIABLE', deck, Card.imgPath('variable' + value))
  }

  play ({stack, stackOwner}) {
    if (stack.topIsRx()) {
      stackOwner.playField.addCardToStack(this, stack)
    } else if (stack.willAccept(this)) {  // this should explicitly check variable stuff
      stack.replaceLowestVar(this).discard()
    } else {
      this.discard()
    }
  }
}

