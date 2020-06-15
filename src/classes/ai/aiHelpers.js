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


/**
 * Finds the grouping that uses as many of the players stacks as possible
 * and returns a Set of stacks to group.
 * @param value The size of the group we are making.
 * @param stacks The stacks that are available to group.
 * @return a Set of stacks that group to make the value, the set is empty
 * if no grouping is possible.
 */
function groupStacks (groupValue, stacks) {
  /* Uses dynamic programming to find a subset of stacks with scores that sum
     To the group value. This has complexity O(groupValue * stacks.length)
     and if in the future changes are made to the number of groups or size of
     group cards it could start to take too long. Though this is very unlikely
     given the game, but should be noted.
     A table is built bottom up. Each cell records the number of stacks from
     the set of elements before it in the list of stacks, the previous
     cell that is used in a possible solution, and wether or not the stack the
     cell represents would be used in a possible solution. We are trying to
     see for dp[groupValue][stacksIndex] could be part of a solution.
     This is relatively standard DP algorithm for subset sum with positive
     values, and the algorithm is also similar to minimum-edit distance.
     The path containing the optimal solution always starts at
     dp[groupValue][stacks.length] and following the coords in cell.prev until
     an undefined prev can give you an optimal solution.
  */
  let nullCell = {size: -1, prev: undefined, used: false}

  // Set up a dynamic programming table
  let dp = []
  for (let i = 0; i <= groupValue; i++) {
    let row = []
    for (let j = 0; j <= stacks.length; j++) {
      let cell = Object.assign({}, nullCell)
      if (i === 0) {
        cell.size = 0
      }
      row.push(cell)
    }
    dp.push(row)
  }

  // Find the best available grouping of stacks bottom up
  for (let i = 1; i <= groupValue; i++) {
    for (let j = 1; j <= stacks.length; j++) {
      // get cells for possible paths
      let notTaken = dp[i][j - 1]
      let taken = Object.assign({}, nullCell)
      let k = i - stacks[j - 1].getScore()
      if (k >= 0) {
        taken = dp[k][j - 1]
      }

      // Decide possiblity is the best
      let best = Object.assign({}, nullCell)
      if (taken.size !== -1 && taken.size + 1 >= notTaken.size) {
        best = {size: taken.size + 1, prev: [k, j - 1], used: true}
      } else if (notTaken.size !== -1) {
        best = {size: notTaken.size, prev: [i, j - 1], used: false}
      }

      // Set this cell to the best cell
      dp[i][j] = best
    }
  }

  // Trace and rebuild the optimal grouping
  let group = new Set()
  let i = groupValue
  let j = stacks.length
  while (true) {  // eslint-disable-line
    let cell = dp[i][j]
    // add used elements to the group
    if (cell.used) {
      group.add(stacks[j - 1])
    }

    // move to the next cell or return the finished group
    if (cell.prev) {
      i = cell.prev[0]
      j = cell.prev[1]
    } else {
      return group
    }
  }
}

export default {
  varStackCompare,
  lowestVar,
  groupStacks
}
