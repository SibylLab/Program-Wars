/**
 * @file player.js file
 * @author Lance on 2017-03-10, Steven modified on 2020-05-25
 */

export default class Player {
  /**
   * Constructor for the Player class
   * @constructor Player
   * @param {int} id The ID of the Player
   * @param {string} name The name of the Player
   */
  constructor (id, name) {
    this.id = id
    this.name = name
    this.positiveEffects = []
    this.negativeEffects = []
    this.cardsPlayed = []
  }

  /**
   * Checks to see if the player has a positive effect.
   * @param {string} effect The effect to check for.
   */
  hasPositive (effect) {
    return this.positiveEffects.find(e => e === effect) !== undefined
  }

  /**
   * Check to see if a player has a negative effect.
   * @param {string} effect The effect to check for.
   */
  hasNegative (effect) {
    return this.negativeEffects.find(e => e === effect) !== undefined
  }
}
