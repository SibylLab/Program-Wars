/**
 * An abstract handler class to deal with possible AI player actions.
 * These are the chain of responsibility objects that can attempt to handle
 * the AI player's turn. See {@link AIHandler}.
 */
class ActionHandler {
  /**
   * Attempts to handle a request to take a player's turn.
   *
   * If it can create a valid play for the turn it will return a playInfo
   * object for it. If there is no valid action to take of this type then
   * returns undefined.
   *
   * **Overridde** in subclasses as this version always returns `undefined`.
   *
   * @param {Player} player - The player taking the action. 
   * @param {Player[]} players - A list of all players in the game.
   * @param {int[]} scores - A list of current player scores.
   * @param {Deck} deck - The deck the player is using.
   * @return {Object|undefined} A playInfo object for a turn, or `undefined`.
   */
  handle(player, players, scores, deck) {  // eslint-disable-line no-unused-vars
    return undefined
  }
}

export default ActionHandler;
