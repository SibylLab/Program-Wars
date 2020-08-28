import AIHandler from '@/classes/AIHandler/AIHandler'
import PlayBestCard from '@/classes/AIHandler/PlayBestCard'
import PlayRandomCard from '@/classes/AIHandler/PlayRandomCard'

// card orders for different AI personalities
const CARD_ORDER = {
  standard: [
    "INSTRUCTION", "METHOD", "VARIABLE", "REPEAT", "SORT", "SEARCH",
    "ANTIVIRUS", "FIREWALL", "SCAN", "SQL_INJECTION", "RANSOM", "TROJAN",
    "VIRUS", "STACK_OVERFLOW", "DDOS", "STACK_UNDERFLOW", "SEARCH"
  ],
  aggresive: [
    "SORT", "SEARCH", "STACK_OVERFLOW", "VIRUS", "SQL_INJECTION", "RANSOM", "TROJAN",
    "DDOS", "STACK_UNDERFLOW", "VARIABLE", "REPEAT", "INSTRUCTION", "METHOD",
    "FIREWALL", "ANTIVIRUS", "SCAN"
  ],
  defensive: [
    "SORT", "SEARCH", "FIREWALL", "ANTIVIRUS", "SCAN", "METHOD", "VARIABLE", "REPEAT",
    "INSTRUCTION", "STACK_OVERFLOW", "TROJAN", "VIRUS", "RANSOM", "SQL_INJECTION",
    "DDOS", "STACK_UNDERFLOW"
  ]
}

/**
 * A factory to create different types of AIHandlers.
 */
class AIHandlerFactory {
  /**
   * Create and return an AIHandler with the given personality.
   * @param {string} personality - The personality for the handler to use.
   * @return {AIHandler} The new AIHandler.
   */
  newHandler (personality) {
    if (personality === 'beginner') {
      return this._newBeginnerHandler()
    } else {
      return this._newStandardHandler(personality)
    }
  }

  /**
   * Creates a new standard handler with the given personality (card priority list name).
   * @private
   */
  _newStandardHandler (personality) {
    let actions = []

    let cards = CARD_ORDER.standard
    if (personality in CARD_ORDER) {
      cards = CARD_ORDER[personality]
    }
    actions.push( new PlayBestCard(cards) )

    let handler = new AIHandler(actions)
    return handler
  }

  /**
   * Creates a new beginner AIHandler with just the PlayRandomCard action handler.
   * @private
   */
  _newBeginnerHandler () {
    return new AIHandler([new PlayRandomCard()])
  }
}

export default AIHandlerFactory;
