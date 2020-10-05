import Card from '@/classes/card/Card'

/**
 * Class for a Variable card.
 * @extends Card
 */
class Variable extends Card {
  /**
   * Creates a new Variable card.
   * @param {int} value - The value of the variable.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (value, deck) {
    super(value, 'VARIABLE', deck, Card.imgPath('variable' + value))
  }

  /**
   * Plays a Variable card on a given stack.
   *
   * If the card cannot be added to the stack because the top is not `Rx` or there
   * is not a lower variable to replace then the card will be discarded.
   *
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Stack} playInfo.stack - The stack the card was played on.
   */
  play ({ stack }) {
    if (stack.topIsRx()) {
      stack.player.playField.addCardToStack(this, stack)
    } else if (stack.willAccept(this)) {
      stack.replaceLowestVar(this).discard()
    } else {
      this.discard()
    }
  }
}

export default Variable;
