/**
 * @file RedrawAction.js file
 * @author Steven on 2020-06-10
 */

import AiHandler from '@/classes/ai/AiHandler'
import PlayBestCardAction from '@/classes/ai/PlayBestCardAction'
//import RedrawAction from '@/classes/ai/RedrawAction'

// constant card order lists
const BASIC_CARD_ORDER = [
  "REPEAT", "INSTRUCTION"
]


/**
 * A factory to create different types of AiHandlers.
 */
export default class AiHandlerFactory {
  /**
   * @constructor RedrawAction
   */
  constructor () {}

  /**
   * Create and return an AiHandler of the given type for the given player.
   */
  newHandler (type, player) {
    let actions = []
    actions.push(new PlayBestCardAction(player, BASIC_CARD_ORDER))

    let handler = new AiHandler(player, actions)
    return handler
  }
}

