import Card from '@/classes/card/Card'
import MethodCardWrapper from '@/classes/card/MethodCardWrapper'
import Stack from '@/classes/stack/Stack'

/**
 * Class for the Method card.
 * @extends Card
 */
class MethodCard extends Card {
  /**
   * Creates a new Method card.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (deck) {
    super(0, 'METHOD', deck, Card.imgPath('method'))
  }

  /**
   * Plays a MethodCard using the given playInfo.
   * Method cards can only be used to create new stacks on a player's playField.
   * @param {Object} playInfo - Information about how the card was played.
   * @param {PlayField} playInfo.playField - The PlayField that the card was played on.
   */
  play ({ playField }) {
    const wrapper = new MethodCardWrapper(this, playField.method)
    const stack = new Stack(wrapper, playField.player)
    playField.addStack(stack)
  }
}

export default Method;
