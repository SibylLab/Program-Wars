import Card from '@/classes/card/Card'
import Stack from '@/classes/stack/Stack'

export default class Instruction extends Card {
  constructor (value, ownerId = -1) {
    super(value, 'INSTRUCTION', Card.imgPath('instruction' + value), ownerId)
  }

  play ({stack, stackOwner}) {
    if (stack) {
      if (stack.isMethod) {
        stackOwner.playField.addCardToStack(this, stack)
      } else {
        return [this]
      }
    } else {
      const newStack = new Stack(this, stackOwner.id)
      stackOwner.playField.addStack(newStack)
    }
    return []
  }
}
