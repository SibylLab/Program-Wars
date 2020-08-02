import Card from '@/classes/card/Card'
import MethodCardWrapper from '@/classes/card/MethodCardWrapper'
import Stack from '@/classes/stack/Stack'

export default class MethodCard extends Card {
  constructor (ownerId = -1) {
    super(0, 'METHOD', Card.imgPath('method'), ownerId)
  }

  play ({ stackOwner }) {
    const wrapper = new MethodCardWrapper(this, stackOwner.playField.method)
    const stack = new Stack(wrapper, stackOwner.id)
    stackOwner.playField.addStack(stack)
    return []
  }
}
