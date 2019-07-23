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
   * @param {int} score The current score of the player
   */
  constructor (id, name, hand, score, isAi) {
    this.name = name
    this.hand = hand
    this.usedBonusCards = []
    this.attackedCards = []
    this.score = score
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
    this.bonusTrue = 0
    this.bonusFalse = 0
    this.isDefensive = false
    this.isCleanSystem = true
    this.totalTrue = 0
    this.totalFalse = 0
    this.totalScore = 0
    this.redrawing = false
    if (this.isAi) {
      this.type = new Personality()
    }
  };

  updateBonus (scoreTrue, scoreFalse) {
    this.bonusTrue += scoreTrue
    this.bonusFalse += scoreFalse
  }
}
