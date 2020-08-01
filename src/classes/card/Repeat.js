import Card from '@/classes/card/Card'

export default class Repeat extends Card {
  constructor (value, ownerId = -1) {
    super(value, 'REPEAT', Card.imgPath('repeat' + value), ownerId)
  }

  play ({stack}) {
    if (!stack.isComplete()) {
      stack.addCard(this)
      return []
    } else {
      return [this]
    }
  }
}

