import Hand from '@/classes/player/Hand'
import PlayField from '@/classes/stack/PlayField'
import StatusEffects from '@/classes/statusEffect/StatusEffects'
import { isAttack, isAlgorithm, isSpecial } from '@/classes/card/cardData'

/**
 * Class for a player.
 *
 * @prop {bool} isAI - True if the player is an AI player.
 * @prop {Hand} hand - The player's hand.
 * @prop {PlayField} playField - The player's PlayField.
 * @prop {StatusEffects} effects - The player's StatusEffects.
 * @prop {string} image - Path to an image for the player.
 */
class Player {
  /**
   * Creates a new player with a given id and name.
   * @param {int} id - The players id number.
   * @param {string} name - The player's name.
   */
  constructor (id, name) {
    this.id = id
    this.name = name
    this.isAI = false
    this.hand = new Hand(id)
    this.playField = new PlayField(this)
    this.effects = new StatusEffects(this)
    this.image = 'static/playerImages/player' + id + '.png'
  }

  /**
   * Updates all of the player's properties that need to be updated every turn.
   */
  update () {
    this.effects.update()
  }

  /**
   * Gets the player's total score from their stacks and status effects.
   * @return {int} The player's total score.
   */
  getScore () {
    let score = this.playField.getScore()
    score += this.effects.getScoreAdjustment()
    return score
  }

  /**
   * Check if a player has a positive StatusEffect.
   * @param {string} effectType - The type of status effect to look for.
   */
  helpedBy (effectType) {
    return this.effects.hasPositive(effectType)
  }

  /**
   * Check if a player has a negative StatusEffect.
   * @param {string} effectType - The type of status effect to look for.
   */
  hurtBy (effectType) {
    return this.effects.hasNegative(effectType)
  }

  /**
   * Check if a player has protection from a given negative StatusEffect.
   * @param {string} effectType - The type of status effect to check.
   */
  protectedFrom (effectType) {
    return this.effects.hasProtectionFrom(effectType)
  }

  /**
   * Get all the attack effects on the player.
   *
   * This includes StatusEffects, Viruses, and Mimicked Cards.
   * @return {Object} `attacks` - All the attacks.
   * @return {StatusEffect[]} `attacks.effects` - List of StatusEffects on the player.
   * @return {Stack[]} `attacks.virusStacks` - List of Stacks that have `virus`
   * cards on them.
   * @return {MimicWrapper[]} `attack.mimics` - List of Mimicked cards in the
   * player's hand.
   */
  getAllAttacks () {
    const effects = this.effects.negative.filter(e => isAttack(e.type))
    const virusStacks = this.playField.getStacksWithVirus()
    const mimics = this.hand.getMimics()
    return { effects, virusStacks, mimics }
  }

  /**
   * Checks if the player can play the given card type.
   *
   * This is to deal with players having effects like Cross-Site Scripting
   * (still uses STACK_UNDERFLOW as a type) and Buffer Overflow (still uses
   * STACK_OVERFLOW as a type).
   *
   * @param {string} type - The card type to check.
   * @return {bool} True if the player isn't being prevented from playing cards
   * of the given type by some other effect.
   */
  canPlay (type) {
    if (isAttack(type) || isAlgorithm(type)) {
      return !this.hurtBy('STACK_UNDERFLOW')
    } else if (!isSpecial(type)) {
      return !this.hurtBy('STACK_OVERFLOW')
    }
    return true
  }
}

export default Player;
