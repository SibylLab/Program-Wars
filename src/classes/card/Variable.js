import Card from '@/classes/card/Card'

export default class Variable extends Card {
  constructor (value, ownerId = -1) {
    super(value, 'VARIABLE', 'variable' + value, ownerId)
  }

  play ({stack}) {
    const discards = []
    if (this._topIsRx(stack)) {
      stack.addCard(this)
    } else if (stack.hasVariable()) {
      discards.push(stack.replaceLowestVar(this))
    } else {
      discards.push(this)
    }
    return discards
  }
}

