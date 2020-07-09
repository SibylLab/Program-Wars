/**
 * Base class for requirements.
 */
export default class Requirement {
  constructor () {
    this.bonusPoints = 0
    this.bonusWasAwarded = {1: false, 2: false, 3: false, 'END': false}
  }

  /**
   * Check to see if the player has competed the requirements for the given round.
   * @param round The round number (1 - 3)
   * @param playerDetails An object containing references to the player, their stacks,
   * their method, their deck?, and their hand.
   * @return true if the player has completed the sprint requirements for the round,
   * otherwise false.
   */
  hasCompletedSprint (round, playerDetails) { return false }

  /**
   * Give the player thier bonuses for completing sprint objectives.
   * @param round The round number (1 - 3)
   * @param completedOnTime Whether or not the ojectives were completed
   * before the end of the given sprint
   * @param playerDetails Same as hasCompletedSprint
   */
  awardBonus (round, completedOnTime, playerDetails) {}
}
