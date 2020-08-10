import Stack from '@/classes/stack/Stack'


// The maximum score allowed for a method
const SCORE_LIMIT = 9
const CARD_LIMIT = 6


/**
 * A stack of cards where the player can build a method.
 */
export default class MethodStack extends Stack {
  constructor (player) {
    super(null, player)
    this.isMethod = true
    this.adjustment = 0
  }

  getScore () {
    let score = this.cards.reduce((acc, card) => { return acc + card.getValue() }, 0)
    score += this.adjustment
    return score < 0 ? 0 : score
  }

  hasMaxRepeats () {
    return true
  }

  hasVariable () {
    return false
  }

  // only instruction cards that adding will keep below or at the limit
  willAccept (card) {
    const total = card.getValue() + this.getScore()
    return card.type === 'INSTRUCTION' && total <= SCORE_LIMIT + this.adjustment
        && this.cards.length < CARD_LIMIT
  }

  // is the method up to the limit yet
  isComplete () {
    return this.getScore() >= SCORE_LIMIT
  }

  toLimit () {
    return SCORE_LIMIT - this.getScore()
  }
}

