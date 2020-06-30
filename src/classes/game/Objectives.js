/**
 * @file Objectives.js file
 * @author Steven on 2020-06-2
 */

// Bonuses for each card played
const GROUP_BONUS = 5
const REPEAT_BONUS = 3
const VAR_BONUS = 2
const SAFETY_BONUS = 3

// Objective Bonuses
const ANTIVIRUS_BONUS = 10
const FIREWALL_BONUS = 5
const CLEAN_BONUS = 10
const COMPLETE_BONUS = 5


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
      return c.type === "ANTIVIRUS" || c.type === "FIREWALL" || c.type === "SCAN"
    })
    return SAFETY_BONUS * safetyCards.length
  }

  /**
   * Return the the defensive bonus the player has.
   * Defensive bonus is given if the player has all safety (not remedy) cards active.
   * Is 0 if the player does not meet the requirements for the bonus.
   */
  getDefensiveBonus () {
    if (this.player.helpedBy("ANTIVIRUS")) {
      return ANTIVIRUS_BONUS
    } else if (this.player.hasPositive('FIREWALL')) {
      return FIREWALL_BONUS
    }
    return 0
  }
  
  /**
   * Return the the clean bonus the player has.
   * Clean bonus is given if the player has no Virus.
   * Is 0 if the player does not meet the requirements for the bonus.
   */
  getCleanBonus (playerHand, playerStacks) {
    if(this.player.hurtBy('RANSOM')|| this.player.hurtBy('SPYWARE')){
      return 0
    }
    // check for viruses
    for (let stack of playerStacks) {
      if (stack.getTop().type === 'VIRUS') {
        return 0
      }
    }
    // check for trojans
    for (let card of playerHand.cards) {
      if (card.isMimic) {
        return 0
      }
    }
    return CLEAN_BONUS
  }

  /**
   * Return a bonus for each stack that a player has with 2 repeats (Rx has to
   * have variable on it).
   * Is 0 if the player has no complete stacks.
   * @param playerStacks An array of the player's stacks
   */
  getCompleteBonus (playerStacks) {
    let complete = playerStacks.filter(s => s.isComplete())
    return complete.length * COMPLETE_BONUS
  }

  /**
   * Wraps all the bonuses up into an object for convenience.
   * Requires the stacks of the player for complete program bonus.
   * @param stacks An array of the player's stacks
   */
  getBonuses (hand, stacks) {
    let bonuses = {}
    bonuses.group = this.player.objectives.getGroupBonus()
    bonuses.repeat = this.player.objectives.getRepeatBonus()
    bonuses.variable = this.player.objectives.getVariableBonus()
    bonuses.safety = this.player.objectives.getSafetyBonus()
    bonuses.clean = this.player.objectives.getCleanBonus(hand, stacks)
    bonuses.defensive = this.player.objectives.getDefensiveBonus()
    bonuses.complete = this.getCompleteBonus(stacks)

    let total = Array.from(Object.values(bonuses)).reduce((acc, bonus) => {
      return acc + bonus
    }, 0)
    bonuses.total = total

    return bonuses
  }
}
