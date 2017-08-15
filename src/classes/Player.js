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
    this.trueScore = trueScore;
    this.falseScore = falseScore;
    this.id = id;
    this.isAi = isAi;
    if(this.isAi) {
      this.type = new Personality();
    }
  };
}
