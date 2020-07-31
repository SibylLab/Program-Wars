import Card from '@/classes/card/Card'
import Stack from '@/classes/stack/Stack'

export default class Instruction extends Card {
  constructor (value, ownerId = -1) {
    super(value, 'INSTRUCTION', this._makeImage('instruction' + value), ownerId)
  }

  play ({player}) {
    const stack = new Stack(this, player.id)
    player.playField.addStack(stack)
    return []
  }
}
