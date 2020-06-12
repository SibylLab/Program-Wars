/**
 * @file RedrawAction.js file
 * @author Steven on 2020-06-10
 */

import AiHandler from '@/classes/ai/AiHandler'
import PlayBestCardAction from '@/classes/ai/PlayBestCardAction'


// card orders for different AI personalities
const CARD_ORDER = {
  easy: ["VARIABLE", "REPEAT", "INSTRUCTION"],
  basic: [
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
  newHandler (type, personality, player) {
    let actions = []
    if (type === "standard") {
      // Put standard action handlers in here for checking if the
      // ai can make a play to win, or can prevent the other player
      // from winning.
      type
    }

    let cards = CARD_ORDER.easy
    if (personality in CARD_ORDER) {
      cards = CARD_ORDER[personality]
    }
    actions.push( new PlayBestCardAction(player, cards) )

    let handler = new AiHandler(player, actions)
    return handler
  }
}

