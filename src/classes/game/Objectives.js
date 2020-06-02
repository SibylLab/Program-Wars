/**
 * @file Objectives.js file
 * @author Steven on 2020-06-2
 */

// Bonuses for each card played
const GROUP_BONUS = 5
const REPEAT_BONUS = 3
const VAR_BONUS = 2
const SAFETY_BONUS = 10

// Objective Bonuses
const DEFENSIVE_BONUS = 10
const CLEAN_BONUS = 10
const COMPLETE_BONUS = 10


export default class Objectives {
  /**
   * Constructor for the Objectives class
   * @constructor Objectives
   */
  constructor (player) {
    this.player = player
    this.cardsPlayed = []
  }

  getGroupBonus () {
    return GROUP_BONUS * this.cardsPlayed.filter(c => c.type === "GROUP").length
  }
  
  getRepeatBonus () {
    return REPEAT_BONUS * this.cardsPlayed.filter(c => c.type === "REPEAT").length
  }

  getVariableBonus () {
    return VAR_BONUS * this.cardsPlayed.filter(c => c.type === "VARIABLE").length
  }

  getSafetyBonus () {
    let safetyCards = this.cardsPlayed.filter((c) => {
      return c.type === "ANTIVURUS" || c.type === "FIREWALL"
    })
    return SAFETY_BONUS * safetyCards.length
  }

  getDefensiveBonus () {
    if (this.player.helpedBy("ANTIVIRUS") && this.player.helpedBy("FIREWALL")) {
      return DEFENSIVE_BONUS
    }
    return 0
  }
  
  getCleanBonus () {
    return this.player.hurtBy("VIRUS") ? 0 : CLEAN_BONUS
  }

  getCompleteBonus (playerStacks) {
    if (playerStacks.filter(s => s.isComplete()).length > 0) {
      return COMPLETE_BONUS
    }
    return 0
  }
}
