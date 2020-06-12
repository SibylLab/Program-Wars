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
  console.log(stack.cards)
  console.log(cards)
  return cards.sort((a,b) => { return a.value - b.value }).shift().value
}

/**
 * Attempts to find a subset of stacks with scores that sum to value.
 * Uses a heuristic that picks random stacks and adding them to the subset
 * until the goal is reached or exceeded.
 * The number of picks attempts to be high enough to find a subset for
 * most reasonable values in our case, but low enough to guarantee that
 * it will still run in less that 0.1 sec.
 * This does not guarantee that a group will be found if one exists. We can
 * veiw this as the AI player not being perfect and sometimes missing the
 * right choice. In short games where there are very few stacks it should
 * almost always find a grouping.
 * The stacks given should always have scores <= value to make it easier
 * for the algorithm to find a good subset.
 * @param value The size of the group we are making.
 * @param stacks The stacks that are available to group.
 * @return a Set of stacks that group to make the value, or undefined if
 * no grouping is possible.
 */
function findGroup (value, stacks) {
  let MAX = 1000  // may be able to go as high as 10,000
  let total = 0
  let used = new Set()
  let group = new Set()

  for (let tried = 0; tried < MAX; tried++) {
    // pick a random stack that hasn't been used already and add it to the group
    let idx = Math.floor(Math.random() * stacks.length)
    let s = stacks[idx]
    if (!used.has(idx) && !group.has(s)) {
      total += s.getScore()
      group.add(s)
    }

    // If the addition gets us the goal value return the group
    if (total == value) {
      return group
    // If we go over the goal then reset everything so we can try again
    } else if (total > value) {
      total = 0
      used.clear()
      group.clear()
    }
  }
  return undefined
}

export default {
  varStackCompare,
  lowestVar,
  findGroup
}
