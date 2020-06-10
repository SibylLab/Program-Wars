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


/**
 * Keeps track of a players played cards and has methods to calculate
 * progress toward different side objectives and bonuses.
 */
export default class Objectives {
  /**
   * Constructor for the Objectives class
   * @constructor Objectives
   */
  constructor (player) {
    this.player = player
    this.cardsPlayed = []
  }

  /**
   * Return the total bonus for group cards played.
   */
  getGroupBonus () {
    return GROUP_BONUS * this.cardsPlayed.filter(c => c.type === "GROUP").length
  }
  
  /**
   * Return the total bonus for repeat cards played.
   */
  getRepeatBonus () {
    return REPEAT_BONUS * this.cardsPlayed.filter(c => c.type === "REPEAT").length
  }

  /**
   * Return the total bonus for variable cards played.
   */
  getVariableBonus () {
    return VAR_BONUS * this.cardsPlayed.filter(c => c.type === "VARIABLE").length
  }

  /**
   * Return the total bonus for safety (not remedy) cards played.
   */
  getSafetyBonus () {
    let safetyCards = this.cardsPlayed.filter((c) => {
      return c.type === "ANTIVIRUS" || c.type === "FIREWALL"
    })
    return SAFETY_BONUS * safetyCards.length
  }

  /**
   * Return the the defensive bonus the player has.
   * Defensive bonus is given if the player has all safety (not remedy) cards active.
   * Is 0 if the player does not meet the requirements for the bonus.
   */
  getDefensiveBonus () {
    if (this.player.helpedBy("ANTIVIRUS") && this.player.helpedBy("FIREWALL")) {
      return DEFENSIVE_BONUS
    }
    return 0
  }
  
  /**
   * Return the the clean bonus the player has.
   * Clean bonus is given if the player has no Virus.
   * Is 0 if the player does not meet the requirements for the bonus.
   */
  getCleanBonus () {
    return this.player.hurtBy("VIRUS") ? 0 : CLEAN_BONUS
  }

  /**
   * Return the bonus given if a player has at least one complete stack.
   * Is 0 if the player has no complete stacks.
   * @param playerStacks An array of the player's stacks
   */
  getCompleteBonus (playerStacks) {
    if (playerStacks.filter(s => s.isComplete()).length > 0) {
      return COMPLETE_BONUS
    }
    return 0
  }

  /**
   * Wraps all the bonuses up into an object for convenience.
   * Requires the stacks of the player for complete program bonus.
   * @param stacks An array of the player's stacks
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
