// Function to create a unique object id
const uuidV1 = require('uuid/v1')

/**
 * Class for status effects that can be applied to a player.
 * @prop {string} id - A unique id for the effect.
 * @prop {string} image - A path to the image for the effect, if it has one.
 */
class StatusEffect {
  /**
   * Creates a new status effect.
   * @param {string} type - The type of the status effect.
   * @param {Player} player - The player the status effect is affecting.
   * @param {int} turnsLeft - The number of turns until the effect ends. Set
   * to -1 if the effect is permanent.
   * @param {bool} [hasImage=true] - True if the effect has an image to display.
   */
  constructor (type, player, turnsLeft, hasImage = true) {
    this.id = uuidV1()
    this.type = type
    this.player = player
    this.turnsLeft = turnsLeft
    if (hasImage) {
      this.image = 'static/cardImages/effects/' + type + '.png'
    }
  }

  /**
   * Reduces the number of turns left by 1, if the effect is not permenant,
   * or already at 0.
   */
  update () {
    if (this.turnsLeft > 0) {
      this.turnsLeft--
    }
  }

  /**
   * Checks to see if the effect is finished.
   * @return {bool} False if the effect has 0 turns left, true otherwise.
   */
  isActive () {
    if (this.turnsLeft === 0) {
      return false
    }
    return true
  }

  /**
   * Destroys the effect.
   *
   * **Override** in sublcasses, by default it does nothing.
   */
  destroy () {}

  /**
   * Returns the bonus given by the effect.
   *
   * Defaults to 0. Should be overridden in subclasses that use bonuses.
   * @return {int} 0
   */
  getBonus () {
    return 0
  }

  /**
   * Returns the penalty given by the effect.
   *
   * Defaults to 0. Should be overridden in subclasses that use penalties.
   * @return {int} 0
   */
  getPenalty () {
    return 0
  }
}

export default StatusEffect;
