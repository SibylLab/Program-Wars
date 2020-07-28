/**
 * @file AiHandler.js file
 * @author Steven on 2020-06-10
 */

import RedrawAction from '@/classes/ai/RedrawAction'

/**
 * A handler to take an Ai players turn.
 * Uses a pattern similar to Chain of Responsibility to make turn choices.
 * Consults objects in the actionHandlers list in order until one can
 * perform its action. If all actions fail it will take the default action
 * which should always be possible.
 *
 * Some more info aboout chain of responsibility can be found at:
 * https://refactoring.guru/design-patterns/chain-of-responsibility
 */
export default class AiHandler {
  /**
   * Creates a new AiHandler to make turn choices for a player.
   * @constructor AiHandler
   * @param {Player} player The Ai player this handler is for.
   */
  constructor (handlers) {
    this.actionHandlers = handlers
    this.defaultAction = new RedrawAction()
  }

  /**
   * Make a choice for the player that it controls.
   * @param hand The hand of the Ai player.
   * @param player The player taking the action. 
   * @param players A list of all players in the game.
   * @param scores A list of current player scores.
   * @return a turn object {playType, card, player, target}
   */
  chooseAction(player, players, scores) {
    // Try all the action handlers until one returns a turn object
    for (let action of this.actionHandlers) {
      try {
        let result = action.handle(player, players, scores)
        if (result) {
          return result
        }

      // Ensure that a component error does not stop the AI turn
      } catch (err) {
        console.log("AI handler error:", err)  // eslint-disable-line
        continue
      }
    }
    // If no handler can handle this action use the default action
    return this.defaultAction.handle(player, players, scores)
  }
}
