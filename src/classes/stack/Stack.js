import { isBase, canPlayOnStack } from '@/classes/card/cardData'

// The maximum number of repeats allowed in a stack
const MAX_REPEATS = 2

export default class Stack {
  constructor (baseCard, player) {
    this.player = player
    this.cards = []
    this.isMethod = false
    if (baseCard) { this.addCard(baseCard) }
  }
  
  addCard (card) {
    this.cards.push(card)
  }

  /**
   * Returns the base card of the stack, which is an instruction or method card.
   * @returns {card} the base of the stack.
   */
  getBase () {
    return this.cards[0]
  }

  /**
   * Returns the top card of the stack.
   * @returns {card} the top card of the stack.
   */
  getTop () {
    return this.cards[this.cards.length - 1]
  }

  popTop () {
    return this.cards.pop()
  }

  topIsRx () {
    return this._isRx(this.getTop())
  }

  /**
   * Returns true if the stack has at least one variable card.
   */
  hasVariable () {
    return this.cards.filter(c => c.type === "VARIABLE").length > 0
  }


  /**
   * Calculates the stack's score.
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
   * Replaces the lowest variable card in the stack with the given card.
   * Returns the replaced card.
   * @param card The variable card to replace with.
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
   * Checks to see if a stack can have a given card placed on top of it.
   * @param {Card} card the card to check.
   * @return {bool} true if the card can be added to the top, false otherwise.
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
   * Checks to see if the stack is a complete program (nested loops).
   * A complete program is one with the max number of repeat cards
   * where if a repeat card is an Rx it must be matched to a variable.
   */
  isComplete () {
    if (this.cards.length === 0 || this.getTop().type === 'VIRUS'
        || !this._hasMaxRepeats()) {
      return false
    }

    // If we have max repeats make sure are all Rx cards paired with a Var
    const numRx = this.cards.filter(c => this._isRx(c)).length
    const numVar = this.cards.filter(c => c.type === 'VARIABLE').length
    return numRx === numVar
  }

  _willAcceptVar (card) {
    if (this.topIsRx()) {
      return true
    }

    const vars = this.cards.filter(c => c.type === 'VARIABLE')
    vars.push(card)
    vars.sort((a,b) => { return a.getValue() - b.getValue() })
    return vars[0].getValue() < card.getValue()
  }

  _isRx (card) {
    return card.type === "REPEAT" && card.getValue() === 1
  }

  /**
   * Checks if the stack has the maximum allowed number of repeats.
   * @return {bool} true if the max repeats has been reached, false otherwise.
   */
  _hasMaxRepeats () {
    let numRepeats = this.cards.reduce((acc, card) => {
      return card.type === 'REPEAT' ? acc + 1 : acc
    }, 0)
    return numRepeats >= MAX_REPEATS
  }
}
