import Requirement from '@/classes/agile/Requirement'

/**
 * Keeps track of progress toward the DRY requirement.
 */
export default class DryReq extends Requirement {
  constructor (playerId) {
    super(playerId)
  }

  hasCompletedSprint (round, playerDetails) {
    if (round === 1) {
      return playerDetails.method.getScore() === 9
    } else if (round === 2) {
      return numCompleteMethodStacks(playerDetails.stacks) >= 1
    } else if (round === 3) {
      return numCompleteMethodStacks(playerDetails.stacks) >= 3
    }
    return false
  }

  awardBonus (round, completedOnTime, playerDetails) {
    if (this.bonusWasAwarded[round]) { return }
    this.bonusWasAwarded[round] = true

    if (round === 1) {
      if (completedOnTime) {
        playerDetails.player.handSize += 1
      }

    } else if (round === 2) {
      if (completedOnTime) {
        playerDetails.player.deck.cards.unshift(new Card("SCAN", 0))  // Until SEARCH is implemented
      }

    } else if (round === 3) {
      if (completedOnTime) {
        playerDetails.player.deck.cards.unshift(new Card("SCAN", 0))
      }
    }
  }

  // helpers //

  /**
   * Returns the number of stacks that start with a method card that have 2
   * repeats on them (Rx must have Variable to be complete).
   */
  numCompleteMethodStacks (stacks) {
    // is Complete might be false with virus on top, so this may need to be
    // addressed here as we should consider it complete in this context?  
    const methodStacks = stacks.filter(s => s.getBase().type === 'METHOD')
    const complete = methodStacks.reduce((acc, stack) => {
      return acc + (stack.isComplete() ? 1 : 0)
    }, 0)
    return complete
  }
}
