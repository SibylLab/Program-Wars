/**
 * @file RedrawAction.js file
 * @author Steven on 2020-06-10
 */

import AiHandler from '@/classes/ai/AiHandler'
import PlayBestCardAction from '@/classes/ai/PlayBestCardAction'


// card orders for different AI personalities
const CARD_ORDER = {
  basic: ["VARIABLE", "REPEAT", "METHOD", "INSTRUCTION"],
  standard: [
    "METHOD", "VARIABLE", "REPEAT", "INSTRUCTION", "ANTIVIRUS", "FIREWALL",
    "OVERCLOCK", "RANSOM", "TROJAN", "VIRUS"
  ],
  aggressive: [
    "VIRUS", "RANSOM", "TROJAN", "VARIABLE", "REPEAT", "INSTRUCTION", "METHOD",
    "FIREWALL", "ANTIVIRUS", "OVERCLOCK"
  ],
  defensive: [
    "FIREWALL", "ANTIVIRUS", "OVERCLOCK", "METHOD", "VARIABLE", "REPEAT",
    "INSTRUCTION", "TROJAN", "VIRUS", "RANSOM"
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

    let cards = CARD_ORDER.basic
    if (personality in CARD_ORDER) {
      cards = CARD_ORDER[personality]
    }
    actions.push( new PlayBestCardAction(player, cards) )

    let handler = new AiHandler(player, actions)
    return handler
  }
}

