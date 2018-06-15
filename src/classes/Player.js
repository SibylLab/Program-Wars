/**
 * @file player.js file
 * @author Lance on 2017-03-10.
 */
import Personality from './Personality'

/**
 * This class represents the player/user model
 */
export default class Player{
  /**
   * Constructor for the Player class
   * @constructor Player
   * @param {int} id The ID of the Player
   * @param {string} name The name of the Player
   * @param {int} hand The hand ID of the player
   * @param {int} trueScore The current score of the player on the true side
   *  @param {int} falseScore The current score of the player on the false side
   */
  constructor(id, name, hand, trueScore, falseScore, isAi) {
    this.name = name;
    this.hand = hand;
    this.usedBonusCards = [];
    this.attackedCards = [];
    this.trueScore = trueScore;
    this.falseScore = falseScore;
    this.id = id;
    this.hasGenerator = false;
    this.hasAntiVirus = false;
    this.hasFirewall = false;
    this.hasPowerOutage = false;
    this.isAi = isAi;
    this.hasOverclock = false;
    this.hasVirus = false;
    this.hasHadOverclock = false;
    this.hasPlayedInstruction = false;
    this.instructionBonus = 0;
    this.completionBonus = 0;
    this.virusBonus = 0;
    this.overClockBonus = 0;
    this.defensiveBonus = 0;
    this.protectionCardsBonus = 0;
    this.groupingBonus = 0;
    this.repetitionBonus = 0;
    this.variablesBonus = 0;
    this.overclockIncrease = 0;

    this.bonusTrue = 0;
    this.bonusFalse = 0;
    this.isDefensive = false;
    this.isCleanSystem = true;
    if(this.isAi) {
      this.type = new Personality();
    }
  };

  updateBonus(scoreTrue, scoreFalse){
    this.bonusTrue += scoreTrue;
    this.bonusFalse += scoreFalse;
  }
}
