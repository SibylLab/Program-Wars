import { isBase, canPlayOnStack } from '@/classes/card/cardData'

// The maximum number of repeats allowed in a stack
const MAX_REPEATS = 2

/**
 * Class representing a stack of Cards.
 *
 * @prop {Card[]} cards - The cards in the stack.
 * @prop {bool} isMethod - True if the stack is a MethodStack.
 */
class Stack {
  /**
   * Creates a new Stack starting with the given baseCard.
   * @param {Card} baseCard - The card to build the stack on. Can be
   * explicity `undefined` and the stack will be empty.
   * @param {Player} player - The player that owns the stack.
   */
  constructor (baseCard, player) {
    this.player = player
    this.cards = []
    this.isMethod = false
    if (baseCard) { this.addCard(baseCard) }
  }

  /**
   * Adds a given card to the top of the stack.
   * @param {Card} card - The card to add.
   */
  addCard (card) {
    this.cards.push(card)
  }

  /**
   * Returns the base card of the stack, which is an `instruction` or `method` card.
   * @returns {Card} the bottom card of the stack.
   */
  getBase () {
    return this.cards[0]
  }

  /**
   * Returns the top card of the stack.
   * @returns {Card} the top card of the stack.
   */
  getTop () {
    return this.cards[this.cards.length - 1]
  }

  /**
   * Removes and returns the top card of the stack.
   * @return {Card|undefined} The top card of the stack, `undefined` if the
   * stack is empty.
   */
  popTop () {
    return this.cards.pop()
  }

  /**
   * Checks if the top of the stack is an `Rx` Card.
   * @return {bool} True if the top is an `Rx` Card, false otherwise.
   */
  topIsRx () {
    return this._isRx(this.getTop())
  }

  /**
   * Checks if the stack has a `variable` card in it.
   * @return {bool} True if there is a `variable` card anywhere in the stack,
   * false otherwise.
   */
  hasVariable () {
    return this.cards.filter(c => c.type === "VARIABLE").length > 0
  }


  /**
   * Calculates the total number of points the stack is worth.
   * @return {int} the stack's total score.
   */
  getScore () {
    const score = this.cards.map(c => {
      if (c.type === 'VIRUS' && this.getBase().type === 'METHOD') {
        return 0.5
      }
      return c.getValue()
    }).reduce((acc, scr) => {
      return acc * scr
    }, this.cards.length ? 1 : 0)

    return Math.floor(score)
  }

  /**
   * Replaces the lowest `variable` card in the stack with the given card.
   * @param {Variable} card - The replacement card.
   * @return {Variable} The replaced Card, unless the given card is the lowest,
   * or only, `variable`. Then nothing will be replaced and the given card
   * will be returned.
   */
  replaceLowestVar (card) {
    const vars = this.cards.filter(c => c.type === 'VARIABLE')
    vars.push(card)
    vars.sort((a,b) => { return a.getValue() - b.getValue() })

    if (vars[0].getValue() < card.getValue()) {
      const replace = vars[0]
      const idx = this.cards.indexOf(replace)
      this.cards[idx] = card
      return replace
    }
    return card
  }

  /**
   * Checks to see if the given Card can be added to the top of the stack.
   * @param {Card} card - The card to check.
   * @return {bool} True if the card can be added to the top, false otherwise.
   */
  willAccept (card) {
    if (this.cards.length === 0) {
      return isBase(card.type)
    } else if (this.getTop().type === 'VIRUS') {
      return false
    } else if (card.type === "VARIABLE") {
      return this._willAcceptVar(card)
    } else if (card.type === "REPEAT") {
      return !this.topIsRx() && !this._hasMaxRepeats()
    } else {
      return canPlayOnStack(card.type)
    }
  }

  /**
   * Checks to see if the stack is a complete program.
   *
   * A stack is complete if it has 2 `repeat` cards on it. However, if any
   * `repeat` cards are `Rx` cards they only count towards the limit if they
   * are paired with a `variable` card.
   *
   * @return {bool} True if the stack is complete, false otherwise.
   */
  isComplete () {
    if (this.cards.length === 0 || this.getTop().type === 'VIRUS'
        || !this._hasMaxRepeats()) {
      return false
    }

    // If we have max repeats make sure are all Rx cards are paired with a Var
    const numRx = this.cards.filter(c => this._isRx(c)).length
    const numVar = this.cards.filter(c => c.type === 'VARIABLE').length
    return numRx === numVar
  }

  /**
   * Checks to see if the stack will accept a `variable` card.
   * @param {Varaible} card - The card to check.
   * @return {bool} True if the stack will accept the card, false otherwise.
   * @private
   */
  _willAcceptVar (card) {
    if (this.topIsRx()) {
      return true
    }

    const vars = this.cards.filter(c => c.type === 'VARIABLE')
    vars.push(card)
    vars.sort((a,b) => { return a.getValue() - b.getValue() })
    return vars[0].getValue() < card.getValue()
  }

  /**
   * Checks if a given card is an `Rx` card.
   * @param {Card} card - The card to check.
   * @return {bool} True if the card is an `Rx`, false otherwise.
   * @private
   */
  _isRx (card) {
    return card.type === "REPEAT" && card.getValue() === 1
  }

  /**
   * Checks if the stack has the maximum allowed number of repeats.
   * @return {bool} True if the max repeats have been reached, false otherwise.
   * @private
   */
  _hasMaxRepeats () {
    let numRepeats = this.cards.reduce((acc, card) => {
      return card.type === 'REPEAT' ? acc + 1 : acc
    }, 0)
    return numRepeats >= MAX_REPEATS
  }
}

export default Stack;
