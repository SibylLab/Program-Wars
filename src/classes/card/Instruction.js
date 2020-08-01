import Card from '@/classes/card/Card'
import Stack from '@/classes/stack/Stack'

export default class Instruction extends Card {
  constructor (value, ownerId = -1) {
    super(value, 'INSTRUCTION', Card.imgPath('instruction' + value), ownerId)
  }

  play ({player, stack}) {
    if (stack) {
      if (stack.isMethod) {
        player.playField.method.addCard(this)
      } else {
        return [this]
      }
    } else {
      const newStack = new Stack(this, player.id)
      player.playField.addStack(newStack)
    }
    return []
  }
}
