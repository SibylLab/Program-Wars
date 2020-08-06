import Card from '@/classes/card/Card'
import MethodCardWrapper from '@/classes/card/MethodCardWrapper'
import Stack from '@/classes/stack/Stack'

export default class MethodCard extends Card {
  constructor (deck) {
    super(0, 'METHOD', deck, Card.imgPath('method'))
  }

  play ({ stackOwner }) {
    const wrapper = new MethodCardWrapper(this, stackOwner.playField.method)
    const stack = new Stack(wrapper, stackOwner.id)
    stackOwner.playField.addStack(stack)
  }
}
