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
   * Creates a new ActionHandler to be used when resolving AI turn choices.
   * Should not create actual instances of this class (though it is not forbidden).
   * @constructor ActionHandler
   * @param {Player} player The AI player the action handler is for.
   */
  constructor (player) {
    this.player = player
  }

  /**
   * Handles the request to take the ActionHandlers specific action.
   * Must be implemented in the subclasses.
   * @param hand The hand of the AI player.
   * @param players A list of all players in the game.
   * @param stacks A list of all stacks in play.
   * @param method The players method stack.
   * @param scores A list of current player scores.
   * @return a turn object {playType, card, player, target} or undefined.
   */
  handle(hand, players, stacks, method, scores) {  // eslint-disable-line no-unused-vars
    return undefined
  }
}

