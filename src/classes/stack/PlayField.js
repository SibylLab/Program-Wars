import Lane from '@/classes/stack/Lane'

/**
 * Class to represent the place where players build their stacks.
 * Now contains 3 independent lanes, each with its own method stack.
 * @prop {Lane[]} lanes - The 3 lanes in the PlayField.
 * @prop {MethodStack} method - Deprecated: Use lanes[0].method instead (kept for backward compatibility).
 * @prop {Stack[]} stacks - Deprecated: Use getAllStacks() instead (kept for backward compatibility).
 */
class PlayField {
  /**
   * Creates a new Playfield with 3 independent lanes.
   * @param {Player} player - The player that owns the PlayField.
   */
  constructor (player) {
    this.player = player
    this.lanes = [
      new Lane(player, 0),
      new Lane(player, 1),
      new Lane(player, 2)
    ]
    
    // Backward compatibility - default to first lane
    this.method = this.lanes[0].method
  }

  /**
   * Gets all stacks across all lanes (for backward compatibility).
   * @return {Stack[]} All regular stacks from all lanes.
   */
  get stacks () {
    return this.lanes.flatMap(lane => lane.stacks)
  }

  /**
   * Finds which lane a given stack belongs to.
   * @param {Stack} stack - The stack to find.
   * @return {Lane|null} The lane containing the stack, or null if not found.
   */
  findLaneForStack (stack) {
    for (const lane of this.lanes) {
      if (lane.method === stack || lane.stacks.includes(stack)) {
        return lane
      }
    }
    return null
  }

  /**
   * Gets the lane at the specified index.
   * @param {int} laneIndex - The lane index (0, 1, or 2).
   * @return {Lane} The lane at that index.
   */
  getLane (laneIndex) {
    return this.lanes[laneIndex]
  }

  /**
   * Adds a card to the top of the given stack.
   *
   * If the addition completes the stack (and it is not the MethodStack) it will
   * be moved to the back of the stacks list in its lane.
   *
   * @param {Card} card - The card to add.
   * @param {Stack} stack - The stack to add the card to.
   */
  addCardToStack (card, stack) {
    const lane = this.findLaneForStack(stack)
    if (lane) {
      lane.addCardToStack(card, stack)
    } else {
      // Fallback to lane 0 if stack not found
      this.lanes[0].addCardToStack(card, stack)
    }
  }

  /**
   * Add a new stack to the PlayField.
   * For backward compatibility, adds to lane 0 unless laneIndex is specified.
   *
   * Always places new stacks in front of completed stacks. Will place
   * stacks started with `method` cards in front of stacks that are made
   * up of a single `instruction`.
   *
   * @param {Stack} stack - The stack to add.
   * @param {int} [laneIndex=0] - The lane to add the stack to (0, 1, or 2).
   */
  addStack (stack, laneIndex = 0) {
    this.lanes[laneIndex].addStack(stack)
  }

  /**
   * Returns the total score of all the stacks across all lanes (excluding MethodStacks).
   * @return {int} The total score of all stacks on the PlayField.
   */
  getScore () {
    return this.lanes.reduce((acc, lane) => {
      return acc + lane.getScore()
    }, 0)
  }

  /**
   * Cleans all `virus` cards from all stacks across all lanes.
   * @return {Virus[]} All of the removed `virus` cards.
   */
  cleanViruses () {
    return this.lanes.flatMap(lane => lane.cleanViruses())
  }

  /**
   * Returns a list of all the stacks that have `virus` cards on them across all lanes.
   * @return {Stack[]} The stacks that have `virus` cards on them.
   */
  getStacksWithVirus () {
    return this.lanes.flatMap(lane => lane.getStacksWithVirus())
  }

  /**
   * Returns all stacks across all lanes (including method stacks).
   * @return {Stack[]} All stacks in the PlayField.
   */
  getAllStacks () {
    return this.lanes.flatMap(lane => lane.getAllStacks())
  }

  /**
   * Finds all defense cards in any stack by component name or card type.
   * @param {string[]} componentNames - Component names to look for.
   * @param {string[]} cardTypes - Card types to look for.
  * @return {{card: Card, stack: Stack}[]} Matches for defense cards.
   */
  findDefenseCards (componentNames = [], cardTypes = []) {
    const matches = []
    const stacks = this.getAllStacks()
    for (const stack of stacks) {
      for (const card of stack.cards) {
        if (card.componentName && componentNames.includes(card.componentName)) {
          matches.push({ card, stack })
        } else if (cardTypes.includes(card.type)) {
          matches.push({ card, stack })
        }
      }
    }
    return matches
  }
}

export default PlayField;
