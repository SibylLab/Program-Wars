/**
 * @file the card class file
 * @author Josh on 2017-03-13, Steven modified on 2020-05-25
 */

const uuidV1 = require('uuid/v1')

// The maximum number of repeats allowed in a stack
const MAX_REPEATS = 2


/**
 * An object to represent a stack of instruction cards.
 */
export default class Stack {

  /**
   * Constructor for Stack
   * @param {int} playerId The ID of the player
   */
  constructor (playerId) {
    this.stackId = uuidV1()
    this.playerId = playerId
    this.cards = []
  }

  /**
   * Check if the stack is empty.
   * @return {bool} true if the stack has no cards.
   */
  isEmpty () {
    return this.cards.length === 0
  }

  /**
   * Calculates the stack's score.
   * @return {int} the stack's total score.
   */
  getScore () {
    if (this.isEmpty()) {
      return 0
    }

    let score = this.getBase().value
    for (let i = 1; i < this.cards.length; i++) {
      score *= this.cards[i].value
    }
    return score
  }

  /**
   * Returns the base card of the stack, which is an instruction or group card.
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

  /**
   * Checks if the stack has the maximum allowed number of repeats.
   * @return {bool} true if the max repeats has been reached, false otherwise.
   */
  hasMaxRepeats () {
    let numRepeats = this.cards.reduce((acc, card) => {
      return card.type === 'REPEAT' ? acc + 1 : acc
    }, 0)
    return numRepeats >= MAX_REPEATS
  }

  /**
   * Checks to see if the stack is hackable or not.
   * @return {bool} true if the stack can be hacked, false otherwise.
   */
  isHackable () {
    return !this.isEmpty() && this.getBase().type !== 'GROUP'
  }

  /**
   * Checks to see if a stack can have a given card placed on top of it.
   * @param {Card} card the card to check.
   * @return {bool} true if the card can be added to the top, false otherwise.
   */
  willAccept (card) {
    let top = this.getTop()
    // Variable cards can only go on Rx cards or replace other variables
    if (card.type === "VARIABLE") {
      if (top.type === "REPEAT") {
        return top.value === 1
      } else if (top.type === "VARIABLE") {
        return top.value < card.value
      }
      return false
    // Repeat cards can't be used if the top is Rx or there are alredy 2 repeats
    } else if (card.type === "REPEAT" && !this.hasMaxRepeats()) {
      if (top.type === "REPEAT") {
        return top.value !== 1
      }
      return true
    }
    // Only variable and repeat cards can be put on a non-empty stack
    return false
  }
}
