/**
 * @file aiHelpers.js file
 * @author Steven on 2020-06-11
 *
 * A collection of helper functions for comparisons and other general tasks
 * related to AI decision making.
 */


/**
 * Comparator for sorting stacks to play a variable card.
 * Expects that all stacks will accept a variable card already.
 */
function varStackCompare (a, b) {
  // sort by stacks with Rx and best score
  if (a.getTop().type === "REPEAT" && b.getTop().type === "REPEAT") {
    return b.getScore() - a.getScore()
  } else if (a.getTop().type === "REPEAT") {
    return -1
  } else if (b.getTop().type === "REPEAT") {
    return 1
  }

  // sort by stack with lowest variable card
  return lowestVar(a) - lowestVar(b) 
}

/**
 * Helper to find the lowest variable in a stack.
 * Expects there to be at least one variable in the stack.
 * @return the value of the lowest variable card.
 */
function lowestVar (stack) {
  let cards = stack.cards.filter(c => c.type === "VARIABLE")
  return cards.sort((a,b) => { return a.value - b.value }).shift().value
}

export default {
  varStackCompare,
  lowestVar
}
