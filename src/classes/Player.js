/**
 * @file player.js file
 * @author Lance on 2017-03-10.
 */
import Personality from './Personality'

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
    this.infectedAmountTrue = 0;
    this.infectedAmountFalse = 0;
    this.numViruses = 0;
    this.overclockIncreaseTrue = 0;
    this.overclockIncreaseFalse = 0;
    this.hasOverclock = false;
    this.hasVirus = false;
    this.hasHadVirus = false;
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
    //this.isCoolSystem = true;
    //this.isCompleteProgram = false;
    this.isCleanSystem = true;
    if(this.isAi) {
      this.type = new Personality();
    }
  };

  // updateOverclock(){
  //    this.overclockIncreaseTrue += this.trueScore - this.infectedAmountTrue + this.overclockIncreaseTrue + this.bonusTrue;
  //    this.overclockIncreaseFalse += this.falseScore - this.infectedAmountFalse + this.overclockIncreaseFalse + this.bonusFalse;
  //    this.numOverclocked++;
  //  };

  // updateVirusAmount(){
  //   this.infectedAmountFalse += Math.floor((this.falseScore - this.infectedAmountFalse + this.bonusFalse)/2);
  //   this.infectedAmountTrue += Math.floor((this.trueScore - this.infectedAmountTrue + this.bonusTrue)/2);
  //   this.numViruses++;
  // };

  updateBonus(scoreTrue, scoreFalse){
    this.bonusTrue += scoreTrue;
    this.bonusFalse += scoreFalse;
  }
}
