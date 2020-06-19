/**
 * @file CyberEffect.js file
 * @author Steve on 2020-06-18
 */

const uuidV1 = require('uuid/v1')

/**
 * An effect for threat prevention or cyber attack on a player.
 */
export default class CyberEffect {
  /**
   * Constructor for the CyberEffect class.
   * @constructor CyberEffect
   */
  constructor (type, targetId, attackerId = undefined) {
    this.id = uuidV1
    this.type = type
    this.targetId = targetId
    this.attackerId = attackerId
    this.turnsLeft = undefined
    if (type === "SPYWARE") {
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
    return this.turnsLeft-- 
  }
}

