/**
 * @file CyberEffect.js file
 * @author Steve on 2020-06-18
 */

/**
 * An effect for threat prevention or cyber attack on a player.
 */
export default class CyberEffect {
  /**
   * Constructor for the CyberEffect class.
   * @constructor CyberEffect
   */
  constructor (type, targetId, attackerId = undefined) {
    this.type = type
    this.targetId = targetId
    this.attackerId = attackerId
    this.turnsLeft = undefined
    if (type === "SPYWARE") {
      this.turnsLeft = 2
    }
    this.image = 'static/cardImages/effects/' + type + '.png'
  }
}

