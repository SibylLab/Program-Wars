/**
 * @file RedrawAction.js file
 * @author Steven on 2020-06-10
 */

import AiHandler from '@/classes/ai/AiHandler'
import PlayBestCardAction from '@/classes/ai/PlayBestCardAction'


// card orders for different AI personalities
const CARD_ORDER = {
  basic: ["VARIABLE", "REPEAT", "INSTRUCTION"],
  standard: [
    "GROUP", "VARIABLE", "REPEAT", "INSTRUCTION", "ANTIVIRUS", "FIREWALL",
    "OVERCLOCK", "HACK", "VIRUS"
  ],
  aggressive: [
    "HACK", "VIRUS", "VARIABLE", "REPEAT", "INSTRUCTION", "GROUP",
    "FIREWALL", "ANTIVIRUS", "OVERCLOCK"
  ],
  defensive: [
    "FIREWALL", "ANTIVIRUS", "OVERCLOCK", "GROUP", "VARIABLE", "REPEAT",
    "INSTRUCTION", "VIRUS", "HACK"
  ]
}


/**
 * A factory to create different types of AiHandlers.
 */
export default class AiHandlerFactory {
  /**
   * @constructor AiHandlerFactory
   */
  constructor () {}

  /**
   * Create and return an AiHandler of the given type for the given player.
   */
  newHandler (personality, player) {
    let actions = []

    let cards = CARD_ORDER.easy
    if (personality in CARD_ORDER) {
      cards = CARD_ORDER[personality]
    }
    actions.push( new PlayBestCardAction(player, cards) )

    let handler = new AiHandler(player, actions)
    return handler
  }
}

