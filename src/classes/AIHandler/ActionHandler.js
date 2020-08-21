/**
 * @file ActionHandler.js file
 * @author Steven on 2020-06-10
 */

/**
 * An abstract handler class to deal with possible AI player actions.
 * These are the chain of responsibility objects that can handle a
 * turn or not. If they can they pass a turn object back to AiHandler
 * and it passes it back to the client to take the turn, if the action handler
 * cannot handle the event it can return undefined and the AiHandler will
 * move to the next action handler.
 */
export default class ActionHandler {
  /**
   * Handles the request to take the ActionHandlers specific action.
   * Must be implemented in the subclasses.
   * @param player The player taking the action. 
   * @param players A list of all players in the game.
   * @param scores A list of current player scores.
   * @param deck The deck the player is using.
   * @return a turn object {playType, card, player, target} or undefined.
   */
  handle(player, players, scores, deck) {  // eslint-disable-line no-unused-vars
    return undefined
  }
}

