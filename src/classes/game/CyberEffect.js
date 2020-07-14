/**
 * @file CyberEffect.js file
 * @author Steve on 2020-06-18
 */

// Function to create a unique object id
const uuidV1 = require('uuid/v1')

/**
 * An effect for threat prevention or cyber attack on a player.
 */
export default class CyberEffect {
  /**
   * Constructor for the CyberEffect class.
   * @constructor CyberEffect
   * @param type String name for the type of effect.
   * @param targetId A unique id for the player being targeted with the effect.
   * @param attackerId A unique id for the player that the effect comes from. Defaults
   * to undefined as it is not needed for positive effects and some negatives.
   */
  constructor (type, targetId, attackerId = undefined) {
    this.id = uuidV1()
    this.type = type
    this.targetId = targetId
    this.attackerId = attackerId
    this.turnsLeft = undefined
    if (type === "SPYWARE" || type === "STACKOVERFLOW") {
      this.turnsLeft = 2
    }
    this.image = 'static/cardImages/effects/' + type + '.png'
  }

  /**
   * Decrements turnsLeft and returns the result
   */
  takeTurn () {
    if (this.turnsLeft === 0) {
      return 0
    } else if (this.turnsLeft === undefined) {
      return 9999
    }
    this.turnsLeft -= 1
    return this.turnsLeft
  }
}

