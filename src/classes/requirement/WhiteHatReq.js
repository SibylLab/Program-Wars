import Requirement from '@/classes/requirement/Requirement'

/**
 * Keeps track of progress toward the WhiteHat requirement.
 */
export default class WhiteHatReq extends Requirement {
  constructor (playerId) {
    super(playerId)
    this.type = 'whiteHat'
  }

  hasCompletedSprint (round, playerDetails) {
    const cardsPlayed = playerDetails.player.objectives.cardsPlayed
    if (round === 1) {
      return cardsPlayed.filter(c => isAttack(c)) >= 2
    } else if (round === 2) {
      return cardsPlayed.filter(c => isAttack(c)) >= 4
    } else if (round === 3) {
      return cardsPlayed.filter(c => isAttack(c)) >= 6
    }
    return false
  }

  awardBonus (round, completedOnTime, playerDetails) {
    if (this.bonusWasAwarded[round]) { return }
    this.bonusWasAwarded[round] = true

    if (round === 1) {
      if (completedOnTime) {
        playerDetails.player.deck.cards.unshift(new Card("SCAN", 0))  // until search card exists
      }
      this.bonusPoints += 10

    } else if (round === 2) {
      if (completedOnTime) {
        playerDetails.player.deck.cards.unshift(new Card("SCAN", 0))  // until redraw card exists
      }
      this.bonusPoints += 10

    } else if (round === 3) {
      if (completedOnTime) {
        this.bonusPoints += 20
      }
      this.bonusPoints += 20
    }
  }
}


