import Card from '@/classes/card/Card'
import Stack from '@/classes/stack/Stack'

export default class Instruction extends Card {
  constructor (value, deck) {
    super(value, 'INSTRUCTION', deck, Card.imgPath('instruction' + value))
  }

  play (playInfo) {
    if (playInfo.stack) {
      if (playInfo.stack.isMethod) {
        playInfo.stack.player.playField.addCardToStack(this, playInfo.stack)
      } else {
        this.discard()
      }
    } else {
      const newStack = new Stack(this, playInfo.playField.player)
      playInfo.playField.addStack(newStack)
    }
  }
}
