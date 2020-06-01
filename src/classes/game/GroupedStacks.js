/**
 * @file GroupedStacks.js
 * @author Steven on 2020-06-01
 */

import Stack from '@/classes/game/Stack'

export default class GroupedStacks {
  /**
   * Constructor for the GroupedStacks class
   * @param {int} id The ID of the Player
   * @param {string} name The name of the Player
   * @param {bool} isAi if the player is a computer player
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
   * Checks to see if the stack is in the group.
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
   * Returns true if the new stack score matches the given group value,
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

  /**
   * Combines all stacks into a single stack with the given groupCard as
   * the base.
   * Returns {stack: the new stack, extraCards: any cards not used for new stack}
   */
  combine (groupCard) {
    let stacksArray = this.getStacks()
    let stack = new Stack(stacksArray[0].playerId)
    stack.cards.push(groupCard)

    let stacks = stacksArray.filter((s) => {
      let top = s.getTop()
      return top.type !== "REPEAT" || top.value !== 1
    })
    for (let s of stacks) {
      let stripped = s.cards.slice(1)
      for (let c of stripped) {
        stack.cards.push(c)
      }
    }

    let unpairedRxStacks = stacksArray.filter((s) => {
      let top = s.getTop()
      return top.type === "REPEAT" && top.value === 1
    })
    if (unpairedRxStacks.length > 0) {
      for (let s of unpairedRxStacks) {
        let stripped = s.cards.slice(1)
        for (let c of stripped) {
          stack.cards.push(c)
        }
      }
    }

    let extra = []
    for (let s of this.stacks) {
      extra.push(s.cards[0])
    }

    return {stack: stack, extraCards: extra}
  }
}
