import Player from '@/classes/player/Player'
import AIHandlerFactory from '@/classes/AIHandler/AIHandlerFactory'

/**
 * Class for an AI player.
 * @prop {AIHanlder} handler - The handler to make turn decisions for the player.
 * @extends Player
 */
class AIPlayer extends Player {
  /**
   * Creates a new AIPlayer.
   * @param {int} id - The id number for the player.
   * @param {string} name - The player's name.
   * @param {string} type - The type of AI to create.
   */
  constructor (id, name, type) {
    super(id, name)
    this.isAI = true
    this.handler = this._makeHandler(type)
  }

  /**
   * Returns a playInfo object representing what the player will do for a its turn.
   *
   * @param {Player[]} players - All the players in the game.
   * @param {Scores[]} scores - All the player's scores.
   * @param {Deck} deck - The deck the player is using.
   * @return {Object} a playInfo object that contains information about the play.
   * This information varies based on the type of play. See {@link AIHandler} for
   * more information about the `playInfo` object.
   */
  getPlay (players, scores, deck) {
    return this.handler.chooseAction(this, players, scores, deck)
  }

  /**
   * Creates an new AIHandler for the player using the given type.
   * @private
   */
  _makeHandler (type) {
    const fact = new AIHandlerFactory()
    return fact.newHandler(type)
  }
}

export default AIPlayer;
