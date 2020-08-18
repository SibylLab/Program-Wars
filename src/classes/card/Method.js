import Card from '@/classes/card/Card'
import MethodCardWrapper from '@/classes/card/MethodCardWrapper'
import Stack from '@/classes/stack/Stack'

export default class MethodCard extends Card {
  constructor (deck) {
    super(0, 'METHOD', deck, Card.imgPath('method'))
  }

  play ({ playField }) {
    const wrapper = new MethodCardWrapper(this, playField.method)
    const stack = new Stack(wrapper, playField.player)
    playField.addStack(stack)
  }
}
