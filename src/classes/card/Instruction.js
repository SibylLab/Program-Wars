import Card from '@/classes/card/Card'
import Stack from '@/classes/stack/Stack'

/**
 * Class for the Instruction card.
 * @extends Card
 */
class Instruction extends Card {
  /**
   * Create a new Instruction card.
   * @param {int} value - The point value of the card.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (value, deck) {
    super(value, 'INSTRUCTION', deck, Card.imgPath('instruction' + value))
  }

  /**
   * Plays an instruction card using the given play info.
   * Instruction cards can be played on a player's MethodStack or used to
   * start a new stack on a player's playField.
   * 
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Stack} playInfo.stack - The stack the card was played on. Required if
   * the card was played on a MethodStack.
   * @param {PlayField} playInfo.playField - The playField the card was played on.
   * Required if the card started a new Stack.
   */
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

export default Instruction;
