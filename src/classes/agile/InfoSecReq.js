import Requirement from '@/classes/agile/Requirement'

/**
 * Keeps track of progress toward the InfoSec requirement.
 */
export default class InfoSecReq extends Requirement {
  constructor (playerId) {
    super(playerId)
    this.type = 'infoSec'
  }

  hasCompletedSprint (round, playerDetails) {
    const cardsPlayed = playerDetails.player.objectives.cardsPlayed
    if (round === 1) {
      return cardsPlayed.filter(c => c.isSafety()) >= 2
    } else if (round === 2) {
      return cardsPlayed.filter(c => c.isSafety()) >= 4
    } else if (round === 'END') {
      return playerDetails.player.objectives.getCleanBonus(
          playerDetails.player, playerDetails.hand, playerDetails.stacks) > 0
    }
    return false
  }

  awardBonus (round, completedOnTime, playerDetails) {
    if (this.bonusWasAwarded[round]) { return }
    this.bonusWasAwarded[round] = true

    if (round === 1) {
      if (completedOnTime) {
        playerDetails.player.deck.cards.unshift(new Card("VARIABLE", 6))
      }
      this.bonusPoints += 10

    } else if (round === 2) {
      if (completedOnTime) {
        playerDetails.player.deck.cards.unshift(new Card("SCAN", 0))  // until redraw card exists
      }
      this.bonusPoints += 10

    } else if (round === 'END') {
      this.bonusPoints += 30
    }
  }
}

