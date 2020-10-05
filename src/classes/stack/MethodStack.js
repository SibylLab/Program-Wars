import Stack from '@/classes/stack/Stack'

// The maximum score allowed for a method
const SCORE_LIMIT = 9

// The maximum number of cards allowed in a method stack
const CARD_LIMIT = 6

/**
 * Class for a Method Stack that only accept `instruction` cards.
 * @prop {int} adjustment - A number of points to adjust the total stack score by.
 * @extends Stack
 */
class MethodStack extends Stack {
  /**
   * Creates a new MethodStack.
   * @param {Player} player - The player that owns the Stack.
   */
  constructor (player) {
    super(null, player)
    this.isMethod = true
    this.adjustment = 0
  }

  /**
   * Calculates the stack score and applies the `adjustment`.
   *
   * Will **Not** be lower than 0.
   * @return {int} The total score of the stack.
   */
  getScore () {
    let score = this.cards.reduce((acc, card) => { return acc + card.getValue() }, 0)
    score += this.adjustment
    return score < 0 ? 0 : score
  }

  /**
   * Returns `true` because MethodStacks cannot have `repeat` cards on them.
   * @return {bool} True.
   */
  hasMaxRepeats () {
    return true
  }

  /**
   * Checks to see if the given card can be added to the top of the stack.
   *
   * Only accepts `instruction` cards that will not put the total score over
   * the max score of 9. Does **not** consider the adjustment in this calculation.
   * So if the score is 9, but there is a -2 adjustment no cards will be accepted
   * even though the total score is below the max. Also, will not accept more
   * than 6 cards total.
   *
   * @return {bool} True if the card can be added to the top, false otherwise.
   */
  willAccept (card) {
    const total = card.getValue() + this.getScore()
    return card.type === 'INSTRUCTION' && total <= SCORE_LIMIT + this.adjustment
        && this.cards.length < CARD_LIMIT
  }

  /**
   * Checks if the stack is complete.
   *
   * For method stacks a stack is complete if it has a total score of 9, **not**
   * including the adjustment, or it has 6 cards in it.
   *
   * @return {bool} True if the stack is complete, false otherwise.
   */
  isComplete () {
    return this.getScore() >= SCORE_LIMIT || this.cards.length === CARD_LIMIT
  }

  /**
   * Returns the number of points needed to reach the score limit.
   * @return {int} The number of points to the score limit.
   */
  toLimit () {
    return SCORE_LIMIT - this.getScore()
  }
}

export default MethodStack;
