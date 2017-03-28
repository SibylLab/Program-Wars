/**
 * @file player.js file
 * @author Lance on 2017-03-10.
 */
/**
 * @class Player
 */
export default class Player{
  /**
   * @constructor Player
   * @param {int} id The ID of the Player
   * @param name
   * @param hand
   * @param score
   */
  constructor(id, name, hand, score) {
    this.name = name;
    this.hand = hand;
    this.score = score;
    this.id = id;
  }
}
