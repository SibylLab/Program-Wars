import Stack from '@/classes/stack/Stack'

// The maximum score allowed for a method
const SCORE_LIMIT = 9

// The maximum number of cards allowed in a method stack
const CARD_LIMIT = 6

/**
 * Class for a Method Stack that accepts component cards based on lane.
 * - Lane 0 (Model): Only MODEL cards
 * - Lane 1 (View): Only VIEW cards
 * - Lane 2 (Controller): Only CONTROLLER cards
 * @prop {int} adjustment - A number of points to adjust the total stack score by.
 * @prop {int} laneIndex - The lane index this method stack belongs to (0, 1, or 2).
 * @extends Stack
 */
class MethodStack extends Stack {
  /**
   * Creates a new MethodStack.
   * @param {Player} player - The player that owns the Stack.
   * @param {int} laneIndex - The lane index (0=Model, 1=View, 2=Controller).
   */
  constructor (player, laneIndex = 0) {
    super(null, player)
    this.isMethod = true
    this.adjustment = 0
    this.laneIndex = laneIndex
  }

  /**
   * Get the component type that this method stack accepts based on lane.
   * @return {string} The component type ('MODEL', 'VIEW', or 'CONTROLLER').
   */
  getAcceptedComponentType () {
    switch (this.laneIndex) {
      case 0: return 'MODEL'
      case 1: return 'VIEW'
      case 2: return 'CONTROLLER'
      default: return 'MODEL'
    }
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
   * Only accepts component cards that match the lane type:
   * - Lane 0 (Model): Accepts MODEL cards
   * - Lane 1 (View): Accepts VIEW cards
   * - Lane 2 (Controller): Accepts CONTROLLER cards
   *
   * Cards must not put the total score over 9 and max 6 cards total.
   *
   * @return {bool} True if the card can be added to the top, false otherwise.
   */
  willAccept (card) {
    const total = card.getValue() + this.getScore()
    const expectedType = this.getAcceptedComponentType()

    return card.type === expectedType
      && !this.isComplete()
      && total <= SCORE_LIMIT + this.adjustment
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
    return this.getScore() >= SCORE_LIMIT + this.adjustment
        || this.cards.length >= CARD_LIMIT
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
