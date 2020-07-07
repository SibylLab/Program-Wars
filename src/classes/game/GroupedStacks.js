/**
 * @file GroupedStacks.js
 * @author Steven on 2020-06-01
 */

/**
 * Keeps track of a set of stacks that are being grouped together.
 */
export default class GroupedStacks {
  /**
   * Constructor for the GroupedStacks class
   */
  constructor () {
    this.stacks = new Set()
    this.score = 0
  }

  /**
   * Returns a list of the stacks in the group.
   */
  getStacks () {
    return Array.from(this.stacks.values())
  }

  /**
   * Checks to see if the given stack is in the group.
   */
  hasStack (stack) {
    return this.stacks.has(stack)
  } 

  /**
   * Removes all stacks from the group.
   */
  reset () {
    this.stacks.clear()
    this.score = 0
  }

  /**
   * Adds or removes a given stack from the group.
   * @param stack The stack to toggle.
   * @param groupValue The value of the group card that is being considered.
   * @return true if the new stack score matches the given group value,
   * false otherwise.
   */
  toggleStack (stack, groupValue) {
    if (this.hasStack(stack)) {
      this.stacks.delete(stack)
      this.score -= stack.getScore()
    } else {
      this.stacks.add(stack)
      this.score += stack.getScore()
    }

    if (this.score === groupValue) {
      return true
    }
    return false
  }
}
