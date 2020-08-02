import Card from '@/classes/card/Card'

export default class Variable extends Card {
  constructor (value, ownerId = -1) {
    super(value, 'VARIABLE', Card.imgPath('variable' + value), ownerId)
  }

  play ({stack, stackOwner}) {
    if (stack.topIsRx()) {
      stackOwner.playField.addCardToStack(this, stack)
    } else if (stack.willAccept(this)) {  // this should explicitly check variable stuff
      return [stack.replaceLowestVar(this)]
    } else {
      return [this]
    }
    return []
  }
}

