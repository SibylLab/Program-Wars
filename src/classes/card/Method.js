import Card from '@/classes/card/Card'
import MethodCardWrapper from '@/classes/card/MethodCardWrapper'
import Stack from '@/classes/stack/Stack'

export default class MethodCard extends Card {
  constructor (ownerId = -1) {
    super(0, 'METHOD', Card.imgPath('method'), ownerId)
  }

  play ({player}) {
    const wrapper = new MethodCardWrapper(this, player.playField.method)
    const stack = new Stack(wrapper, player.id)
    player.playField.addStack(stack)
    return []
  }
}
