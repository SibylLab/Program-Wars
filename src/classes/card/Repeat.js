import Card from '@/classes/card/Card'

/**
 * Class for Repeat cards.
 * @extends Card
 */
class Repeat extends Card {
  /**
   * Creates a new Repeat card.
   * @param {int} value - The number of times the repeat will happen.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (value, deck) {
    super(value, 'REPEAT', deck, Card.imgPath('repeat' + value))
  }

  /**
   * Plays the repeat card on a target stack.
   *
   * If the stack is already complete the card will simply be discarded.
   *
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Stack} playInfo.stack - The stack the card was played on.
   */
  play ({ stack }) {
    if (!stack.isComplete()) {
      stack.player.playField.addCardToStack(this, stack)
    } else {
      this.discard()
    }
  }
}

export default Repeat;
