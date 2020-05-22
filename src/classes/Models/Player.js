/**
 * @file player.js file
 * @author Lance on 2017-03-10.
 */
import Personality from '../AiActions/Personality'

export default class Player {
  /**
   * Constructor for the Player class
   * @constructor Player
   * @param {int} id The ID of the Player
   * @param {string} name The name of the Player
   * @param {int} hand The hand ID of the player
   * @param {int} instructions The current number of instructions of the player
   */
  constructor (id, name, hand, instructions, isAi) {
    this.name = name
    this.hand = hand
    this.usedBonusCards = []
    this.attackedCards = []
    this.instructions = instructions
    this.id = id
    this.hasGenerator = false
    this.hasAntiVirus = false
    this.hasFirewall = false
    this.hasPowerOutage = false
    this.hasBatteryBackup = false
    this.isAi = isAi
    this.hasOverclock = false
    this.hasVirus = false
    this.hasHadOverclock = false
    this.hasPlayedInstruction = false
    this.instructionBonus = 0
    this.numInstructions = 0
    this.completionBonus = 0
    this.virusBonus = 0
    this.overClockBonus = 0
    this.defensiveBonus = 0
    this.protectionCardsBonus = 0
    this.groupingBonus = 0
    this.numGroups = 0
    this.repetitionBonus = 0
    this.numRepeats = 0
    this.variablesBonus = 0
    this.numVariables
    this.overclockIncrease = 0
    this.cards = []
    this.bonus = 0
    this.isDefensive = false
    this.isCleanSystem = true
    this.totalInstructions = 0
    this.totalScore = 0
    this.redrawing = false
    if (this.isAi) {
      this.type = new Personality()
    }
  }

  updateBonus (score) {
    this.bonus += score
  }

  /**
   * Checks to see if the player is under the effect of a given safety
   * or remedy card.
   * @param {string} cardType the type of card to check for.
   * @return true if the player is protected by the card type, otherwise false
   */
  protectedBy (cardType) {
    return this.usedBonusCards.find(c => c.type === cardType) !== undefined
  }
}
