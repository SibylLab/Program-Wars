import Stack from '@/classes/stack/Stack'


// The maximum score allowed for a method
const METHOD_LIMIT = 9


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
    return card.type === 'INSTRUCTION' && total <= METHOD_LIMIT + this.adjustment
  }

  // is the method up to the limit yet
  isComplete () {
    return this.getScore() >= METHOD_LIMIT
  }

  toLimit () {
    return METHOD_LIMIT - this.getScore()
  }
}

