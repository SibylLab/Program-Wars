/**
 * @file RedrawAction.js file
 * @author Steven on 2020-06-10
 */

import AiHandler from '@/classes/ai/AiHandler'
import PlayBestCardAction from '@/classes/ai/PlayBestCardAction'

// constant card order lists
const CARD_ORDER = {
  basic: [
    "GROUP", "VARIABLE", "REPEAT", "INSTRUCTION", "ANTIVIRUS", "FIREWALL",
    "OVERCLOCK", "HACK", "VIRUS"
  ]
}


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

    if (type in CARD_ORDER) {
      actions.push(new PlayBestCardAction(player, CARD_ORDER[type]))
    }

    let handler = new AiHandler(player, actions)
    return handler
  }
}

