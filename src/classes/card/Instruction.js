import Card from '@/classes/card/Card'
import Stack from '@/classes/stack/Stack'

export default class Instruction extends Card {
  constructor (value, deck) {
    super(value, 'INSTRUCTION', deck, Card.imgPath('instruction' + value))
  }

  play ({stack, stackOwner}) {
    if (stack) {
      if (stack.isMethod) {
        stackOwner.playField.addCardToStack(this, stack)
      } else {
        this.discard()
      }
    } else {
      const newStack = new Stack(this, stackOwner.id)
      stackOwner.playField.addStack(newStack)
    }
  }
}
