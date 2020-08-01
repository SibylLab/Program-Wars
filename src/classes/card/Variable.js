import Card from '@/classes/card/Card'

export default class Variable extends Card {
  constructor (value, ownerId = -1) {
    super(value, 'VARIABLE', Card.imgPath('variable' + value), ownerId)
  }

  play ({stack}) {
    const discards = []
    if (stack.topIsRx()) {
      stack.addCard(this)
    } else if (stack.willAccept(this)) {  // this should explicitly check variable stuff
      discards.push(stack.replaceLowestVar(this))
    } else {
      discards.push(this)
    }
    return discards
  }
}

