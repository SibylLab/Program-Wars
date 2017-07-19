/**
 * @file player.js file
 * @author Lance on 2017-03-10.
 */
import Human from './Human'

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
    this.type = new Human();
  };

  playerTest(store, event, event2) {
    console.log('in player function')
    console.log(store.state.players)
    console.log(event + event2)
  }
}
