/**
 * @file player.js file
 * @author Lance on 2017-03-10, Steven modified on 2020-05-25
 */

import Objectives from '@/classes/game/Objectives'
import CyberEffect from '@/classes/game/CyberEffect'

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
    this.isAi = isAi
    this.positiveEffects = []
    this.negativeEffects = []
    this.objectives = new Objectives(this)
    this.image = 'static/playerImages/player' + id + '.png'
  }

  /**
   * Checks to see if the player has a positive effect.
   * @param {string} type The effect type to check for.
   */
  helpedBy (type) {
    if ((type === "SCAN" || type === "FIREWALL") && this.helpedBy('ANTIVIRUS')) {
      return true
    }
    let effect = this.positiveEffects.find(e => e.type === type)
    return effect !== undefined
  }

  /**
   * Check to see if a player has a negative effect.
   * @param {string} type The effect type to check for.
   */
  hurtBy (type) {
    let effect = this.negativeEffects.find(e => e.type === type)
    return effect !== undefined
  }

  /**
   * Find out if a player is protected from an effect.
   * @param {string} effect The effect to check.
   * @return true if the player is protected, false otherwise.
   */
  isProtectedFrom (type) {
    if (type === "TROJAN" || type === "RANSOM") {
      return this.helpedBy("FIREWALL")
    }
    return this.helpedBy('ANTIVIRUS')
  }

  /**
   * Adds a positive effect and alters negative effects if necessary.
   */
  addPositive (type) {
    if (type === "ANTIVIRUS") {
      this.cleanAll()
    } else if (type === "FIREWALL") {
      this.removeNegative('RANSOM')
    }  // if we have gotten to here with SCAN it should be added
    this.positiveEffects.push(new CyberEffect(type, this.id))
  }

  /**
   * Adds a negative effect and alters positive effects if necessary.
   */
  addNegative (type, attackerId) {
    if (this.helpedBy('SCAN')) {
      this.removePositive('SCAN')
      return
    }
    let effect = new CyberEffect(type, this.id, attackerId)
    if (type === 'SPYWARE') {
      effect.turnsLeft = 2
    }
    this.negativeEffects.push(effect)
  }

  /**
   * Removes all positive effects of a given type.
   */
  removePositive (type) {
    this.positiveEffects = this.positiveEffects.filter(e => e.type !== type)
  }

  /**
   * Removes all negative effects of a given type.
   */
  removeNegative (type) {
    this.negativeEffects = this.negativeEffects.filter(e => e.type !== type)
  }

  /**
   * Removes a specific effect from the effect list it is in.
   */
  removeEffect (effect) {
    this.positiveEffects = this.positiveEffects.filter(e => e !== effect)
    this.negativeEffects = this.negativeEffects.filter(e => e !== effect)
  }

  /**
   * Removes all negative effects and weaker positive effects.
   */
  cleanAll () {
    this.negativeEffects = []
    this.removePositive('FIREWALL')
    this.removePositive('SCAN')
  }
}

