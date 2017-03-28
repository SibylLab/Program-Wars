/**
 * @file player.js file
 * @author Lance on 2017-03-10.
 */

export default class Player{
  /**
   * Constructor for the Player class
   * @constructor Player
   * @param {int} id The ID of the Player
   * @param {string} name The name of the Player
   * @param {int} hand The hand ID of the player
   * @param {int} score The current score of the player
   */
  constructor(id, name, hand, score) {
    this.name = name;
    this.hand = hand;
    this.score = score;
    this.id = id;
  }
}
