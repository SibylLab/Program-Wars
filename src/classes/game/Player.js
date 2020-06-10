/**
 * @file player.js file
 * @author Lance on 2017-03-10, Steven modified on 2020-05-25
 */

import Objectives from '@/classes/game/Objectives'

/**
 * A player in the game.
 */
export default class Player {
  /**
   * Constructor for the Player class
   * @constructor Player
   * @param {int} id The ID of the Player
   * @param {string} name The name of the Player
   * @param {bool} isAi if the player is a computer player
   */
  constructor (id, name, isAi) {
    this.id = id
    this.name = name
    this.positiveEffects = new Set()
    this.negativeEffects = new Set()
    this.objectives = new Objectives(this)
    this.isAi = isAi
  }

  /**
   * Checks to see if the player has a positive effect.
   * @param {string} effect The effect to check for.
   */
  helpedBy (effect) {
    if (effect === "OVERCLOCK" && this.positiveEffects.has("ANTIVIRUS")) {
      return true
    }
    return this.positiveEffects.has(effect)
  }

  /**
   * Check to see if a player has a negative effect.
   * @param {string} effect The effect to check for.
   */
  hurtBy (effect) {
    return this.negativeEffects.has(effect)
  }

  /**
   * Find out if a player is protected from an effect.
   * @param {string} effect The effect to check.
   * @return true if the player is protected, false otherwise.
   */
  isProtectedFrom (effect) {
    if (effect === "HACK") {
      return this.helpedBy("FIREWALL")
    } else if (effect === "VIRUS") {
      return this.helpedBy("ANTIVIRUS")
    }
    return false
  }

  /**
   * Adds a positive effect and alters negative effects if necessary.
   */
  addPositive (effect) {
    if (effect === "ANTIVIRUS") {
      this.negativeEffects.delete("VIRUS")
      this.positiveEffects.delete("OVERCLOCK")
    } else if (effect === "OVERCLOCK" && this.hurtBy("VIRUS")) {
      this.negativeEffects.delete("VIRUS")
      return
    }
    this.positiveEffects.add(effect)
  }

  /**
   * Adds a negative effect and alters positive effects if necessary.
   */
  addNegative (effect) {
    if (effect === "VIRUS" && this.helpedBy("OVERCLOCK")) {
        this.positiveEffects.delete("OVERCLOCK")
        return
    }
    this.negativeEffects.add(effect)
  }
}
