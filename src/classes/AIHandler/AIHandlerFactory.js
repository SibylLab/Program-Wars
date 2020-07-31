import AIHandler from '@/classes/AIHandler/AIHandler'
import PlayBestCard from '@/classes/AIHandler/PlayBestCard'
import PlayRandomCard from '@/classes/AIHandler/PlayRandomCard'
import MethodStackFirst from '@/classes/AIHandler/MethodStackFirst'

// card orders for different AI personalities
const CARD_ORDER = {
  standard: [
    "METHOD", "VARIABLE", "REPEAT", "INSTRUCTION", "ANTIVIRUS", "FIREWALL",
    "SCAN", "SQL_INJECTION", "RANSOM", "TROJAN", "VIRUS", "STACK_OVERFLOW",
    "DDOS", "STACK_UNDERFLOW"
  ],
  aggresive: [
    "STACK_OVERFLOW", "VIRUS", "SQL_INJECTION", "RANSOM", "TROJAN",
    "DDOS", "STACK_UNDERFLOW", "VARIABLE", "REPEAT", "INSTRUCTION", "METHOD",
    "FIREWALL", "ANTIVIRUS", "SCAN"
  ],
  defensive: [
    "FIREWALL", "ANTIVIRUS", "SCAN", "METHOD", "VARIABLE", "REPEAT",
    "INSTRUCTION", "STACK_OVERFLOW", "TROJAN", "VIRUS", "RANSOM", "SQL_INJECTION",
    "DDOS", "STACK_UNDERFLOW"
  ]
}

/**
 * A factory to create different types of AIHandlers.
 */
export default class AIHandlerFactory {
  /**
   * @constructor AIHandlerFactory
   */
  constructor () {}

  /**
   * Create and return an AIHandler of the given type for the given player.
   */
  newHandler (personality) {
    if (personality === 'beginner') {
      return this.newBeginnerHandler()
    } else {
      return this.newStandardHandler(personality)
    }
  }

  newStandardHandler (personality) {
    let actions = [new MethodStackFirst()]

    let cards = CARD_ORDER.basic
    if (personality in CARD_ORDER) {
      cards = CARD_ORDER[personality]
    }
    actions.push( new PlayBestCard(cards) )

    let handler = new AIHandler(actions)
    return handler
  }

  newBeginnerHandler () {
    return new AIHandler([new PlayRandomCard()])
  }
}

