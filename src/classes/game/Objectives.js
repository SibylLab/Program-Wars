/**
 * @file Objectives.js file
 * @author Steven on 2020-06-2
 */

// Bonuses for each card played
const GROUP_BONUS = 5
const REPEAT_BONUS = 2
const VAR_BONUS = 3
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
      return c.type === "ANTIVIRUS" || c.type === "FIREWALL"
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

  /**
   * Wraps all the bonuses up into an object for convenience.
   * Requires the stacks of the player for complete program bonus.
   */
  getBonuses (stacks) {
    let bonuses = {}
    bonuses.group = this.player.objectives.getGroupBonus()
    bonuses.repeat = this.player.objectives.getRepeatBonus()
    bonuses.variable = this.player.objectives.getVariableBonus()
    bonuses.safety = this.player.objectives.getSafetyBonus()
    bonuses.clean = this.player.objectives.getCleanBonus()
    bonuses.defensive = this.player.objectives.getDefensiveBonus()
    bonuses.complete = this.getCompleteBonus(stacks)

    let total = Array.from(Object.values(bonuses)).reduce((acc, bonus) => {
      return acc + bonus
    }, 0)
    bonuses.total = total

    return bonuses
  }
}
