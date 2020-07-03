/**
 * @file Objectives.js file
 * @author Steven on 2020-06-2
 */

// Bonuses for each card played
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
   * @param playerId The id of the player who owns the objectives.
   */
  constructor (playerId) {
    this.playerId = playerId
    this.cardsPlayed = []
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
   * @param player The player to calculate bonus for.
   */
  getDefensiveBonus (player) {
    if (player.helpedBy("ANTIVIRUS")) {
      return ANTIVIRUS_BONUS
    } else if (player.hasPositive('FIREWALL')) {
      return FIREWALL_BONUS
    }
    return 0
  }
  
  /**
   * Return the the clean bonus the player has.
   * Clean bonus is given if the player has no Virus.
   * Is 0 if the player does not meet the requirements for the bonus.
   * @param player The player to calculate bonus for.
   * @param playerHand The player's hand.
   * @param playerStacks An array of the player's stacks
   */
  getCleanBonus (player, playerHand, playerStacks) {
    if(player.hurtBy('RANSOM')|| player.hurtBy('SPYWARE')){
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
   * @param player The player to calculate bonus for.
   * @param hand The player's hand.
   * @param stacks The player's stacks.
   */
  getBonuses (player, hand, stacks) {
    let bonuses = {}
    bonuses.repeat = this.getRepeatBonus()
    bonuses.variable = this.getVariableBonus()
    bonuses.safety = this.getSafetyBonus()
    bonuses.clean = this.getCleanBonus(player, hand, stacks)
    bonuses.defensive = this.getDefensiveBonus(player)
    bonuses.complete = this.getCompleteBonus(stacks)

    let total = Array.from(Object.values(bonuses)).reduce((acc, bonus) => {
      return acc + bonus
    }, 0)
    bonuses.total = total

    return bonuses
  }
}
