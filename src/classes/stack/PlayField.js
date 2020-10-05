import MethodStack from '@/classes/stack/MethodStack'

/**
 * Class to represent the place where players build their stacks.
 * @prop {MethodStack} method - The players MethodStack.
 * @prop {Stack[]} stacks - The other Stacks in play.
 */
class PlayField {
  /**
   * Creates a new Playfield.
   * @param {Player} player - The player that owns the PlayField.
   */
  constructor (player) {
    this.player = player
    this.method = new MethodStack(player)
    this.stacks = []
  }

  /**
   * Adds a card to the top of the given stack.
   *
   * If the addition completes the stack (and it is not the MethodStack) it will
   * be moved to the back of the stacks list.
   *
   * @param {Card} card - The card to add.
   * @param {Stack} stack - The stack to add the card to.
   */
  addCardToStack (card, stack) {
    stack.cards.push(card)
    if (stack.isComplete() && stack !== this.method) {
      this.stacks = this.stacks.filter(s => s !== stack)
      this.stacks.push(stack)
    }
  }

  /**
   * Add a new stack to the PlayField.
   *
   * Always places new stacks in front of completed stacks. Will place
   * stacks started with `method` cards in front of stacks that are made
   * up of a single `instruction`.
   *
   * @param {Stack} stack - The stack to add.
   */
  addStack (stack) {
    const baseType = stack.getBase().type

    const completeStack = this.stacks.find(s => s.isComplete())
    const singleInstruction = this.stacks.find((s) => {
      return s.cards.length === 1 && s.getBase().type === 'INSTRUCTION'
    })

    let idx = this.stacks.length
    if (baseType === 'METHOD' && singleInstruction) {
      idx = this.stacks.indexOf(singleInstruction)
    } else if (completeStack) {
      idx = this.stacks.indexOf(completeStack)
    }

    this.stacks.splice(idx, 0, stack)
  }

  /**
   * Returns the total score of all the stacks (excluding the MethodStack).
   * @return {int} The total score of all stacks on the PlayField.
   */
  getScore () {
    return this.stacks.reduce((acc, stack) => {
      return acc += stack.getScore()
    }, 0)
  } 

  /**
   * Cleans all `virus` cards from the stacks on the PlayField.
   * @return {Virus[]} All of the removed `virus` cards.
   */
  cleanViruses () {
    const infected = this.getStacksWithVirus()
    return infected.map(s => s.cards.pop())
  }

  /**
   * Returns a list of all the stacks that have `virus` cards on them.
   * @return {Stack[]} The stacks that have `virus` cards on them.
   */
  getStacksWithVirus () {
    return this.stacks.filter(s => s.getTop().type === 'VIRUS')
  }
}

export default PlayField;
