/**
 * @file PlayBestCardAction.js file
 * @author Steven on 2020-06-10
 */

import ActionHandler from '@/classes/ai/ActionHandler'

//  Helper functions for complex comparisons
//  should probably be in their own module

/**
 * Comparator for sorting stacks to play a variable card.
 * Expects that all stacks will accept a variable card already.
 */
function varStackCompare (a, b) {
  // sort by stacks with Rx and best score
  if (a.getTop() === "REPEAT" && b.getTop() === "REPEAT") {
    return b.getScore() - a.getScore()
  } else if (a.getTop() === "REPEAT") {
    return -1
  } else if (b.getTop() === "REPEAT") {
    return 1
  }

  // sort by stack with lowest variable card
  return lowestVar(a) - lowestVar(b) 
}

/**
 * Helper to find the lowest variable in a stack.
 * Expects there to be at least one variable in the stack.
 * @return the value of the lowest variable card.
 */
function lowestVar (stack) {
  let cards = stack.cards.filter(s => s.type === "VARIABLE")
  return cards.sort((a,b) => { return a.value - b.value }).shift().value
}


/**
 * Takes a Redraw action for the ai players turn.
 */
export default class PlayBestCardAction extends ActionHandler {
  /**
   * @constructor PlayBestCardAction
   * Play order will determine what cards are considered the "Best". If you
   * exlude a card type from the order cards of that type will not be played.
   */
  constructor (player, playOrder) {
    super(player)
    this.playOrder = this.createOrder(playOrder)
  }

  /**
   * Creates an object that maps card types to priorities to be used when
   * sorting the players hand.
   */
  createOrder (playOrder) {
    let cardOrder = {}
    for (let i = 0; i < playOrder.length; i++) {
      cardOrder[playOrder[i]] = i
    }
    return cardOrder
  }

  /**
   * Returns an move object for playing the higest priority card in the
   * players hand or undefined if none of them can be played.
   *
   * A mini chain of responsibility for cards that uses internal functions for
   * each card type for now.
   */
  handle (hand, players, stacks, scores) {  // eslint-disable-line no-unused-vars
    let cards = this.sortHand(hand)
    for (let card of cards) {
      let type = card.type.toLowerCase()

      // Finding the correct method for this card type
      if (card.type in this.playOrder) {
        let move
        if (card.isSafety()) {
          move = this.playSafety(card)
        } else if (card.isAttack()) {
          move = this.playAttack(card, players, scores)
        } else if (type in this) {
          move = this[type](card, {hand, players, stacks, scores})
        }
        if (move) { return move }
      }
    }
    return undefined
  }

  /**
   * Returns a sorted list of the cards in a players hand.
   * Sorts by lowest order value and then by highest card value.
   * Cards types that are not in the playOrder will move to back.
   */
  sortHand (hand) {
    return hand.cards.sort((a, b) => {
      if (!(a.type in this.playOrder)) { return 1 }
      else if (!(b.type in this.playOrder)) { return -1 }

      if (a.type === b.type) {
        return b.value - a.value
      }
      return this.playOrder[a.type] - this.playOrder[b.type]
    })
  }

  /**
   * Make a move for an instruction card.
   * It is currently always possible to start a new instruction if a player
   * has an instruction card.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for starting a new stack with the given card.
   */
  instruction (card, state) {  // eslint-disable-line no-unused-vars
    return {
      playType: 'startNewStack',
      card: card,
      player: this.player,
      target: this.player
    }
  }

  /**
   * Make a move for adding a repeat card to the largest stack that
   * is available.
   * Should prioritize group stacks over normal stacks (even if lower in value?)
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for adding a repeat to a stack, or undefined if
   * no stack can be played on.
   */
  repeat (card, state) {
    // get the player owned stack with the largest score
    let stack = state.stacks.filter((s) => {
      return s.playerId === this.player.id && !s.isComplete() && s.willAccept(card)
    }).sort((a, b) => {  // could use reduce instead
      return b.getScore() - a.getScore()
    }).shift()

    if (stack) {
      return {
        playType: 'playCardOnStack',
        card: card,
        player: this.player,
        target: stack
      }
    }
    return undefined
  }

  /**
   * Make a move for adding a variable card to the best stack available.
   * Prioritizes unmatched Rx cards, then stack with lowest variable in it.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for adding a variable to a stack, or undefined if
   * no stack can be played on.
   */
  variable (card, state) {
    let stacks = state.stacks.filter((s) => {
      return s.playerId === this.player.id && s.willAccept(card)
    })
    let stack = stacks.sort(varStackCompare).shift()

    if (stack) {
      return {
        playType: 'playCardOnStack',
        card: card,
        player: this.player,
        target: stack
      }
    }
    return undefined
  }

  /**
   * Hack another players stack under specific conditions.
   * Will not hack single card stacks as this is a waste. Picks the biggest
   * stack available that meets the criteria.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for hacking a stack, or undefined if
   * no stack can be hacked.
   */
  hack (card, state) {
    let stack = state.stacks.filter((s) => {
      return s.playerId !== this.player.id && s.cards.length > 1 && s.isHackable()
    }).sort((a, b) => {
      return b.getScore() - a.getScore()
    }).shift()

    if (stack) {
      return {
        playType: 'hackStack',
        card: card,
        player: this.player,
        target: stack
      }
    }
    return undefined
  }

  /**
   * Play a safety card on oneself if not already protected.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for playing a safety, or undefined
   * if the player is already protected.
   */
  playSafety (card) {
    if (!this.player.helpedBy(card.type)) {
      return {
        playType: 'playSpecialCard',
        card: card,
        player: this.player,
        target: this.player
      }
    }
    return undefined
  }

 
  /**
   * Play an attack card on the opponent with the highest score that
   * is not already attacked by or protected from the card.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for playing an attack, or undefined
   * no target can be found.
   */
  playAttack (card, players, scores) {
    let target = players.filter((p) => {
      return !p.hurtBy(card.type) && !p.isProtectedFrom(card.type)
    }).sort((a, b) => {
      return scores[b.id].score - scores[a.id].score
    }).shift()

    if (target) {
      return {
        playType: 'playSpecialCard',
        card: card,
        player: this.player,
        target: target
      }
    }
    return undefined
  }

  /**
   * Find a possible grouping of stacks that will meet the group card value.
   * This is a subset sum problem, which is NP-complete, so some heuristic must
   * be used to keep worst case scenarios, when we have a lot of stacks and
   * cannot make the sum with any subset, from taking too long.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for grouping some stacks, or undefined if
   * no group can be found.
   */
  group (card, state) {
    let groupable = state.stacks.filter((s) => {
      return s.playerId === this.player.id && s.getScore() <= card.value
    })
    if (!groupable) { return undefined }

    let stacks = this.findGroup(card.value, groupable)
    if (stacks) {
      return {
        playType: 'groupStacks',
        card: card,
        player: this.player,
        target: stacks
      }
    }
    return undefined
  }


  /**
   * Attempts to find a subset of stacks with scores that sum to value.
   * Uses a heuristic that picks random stacks and adding them to the subset
   * until the goal is reached or exceeded.
   * The number of picks attempts to be high enough to find a subset for
   * most reasonable values in our case, but low enough to guarantee that
   * it will still run in less that 0.1 sec.
   * This does not guarantee that a group will be found if one exists. We can
   * veiw this as the AI player not being perfect and sometimes missing the
   * right choice. In short games where there are very few stacks it should
   * almost always find a grouping.
   * The stacks given should always have scores <= value to make it easier
   * for the algorithm to find a good subset.
   * @param value The size of the group we are making.
   * @param stacks The stacks that are available to group.
   * @return a Set of stacks that group to make the value, or undefined if
   * no grouping is possible.
   */
  findGroup (value, stacks) {
    console.log(value, stacks)
    let MAX = 1000  // may be able to go as high as 10,000
    let total = 0
    let used = new Set()
    let group = new Set()

    for (let tried = 0; tried < MAX; tried++) {
      // pick a random stack that hasn't been used already and add it to the group
      let idx = Math.floor(Math.random() * stacks.length)
      let s = stacks[idx]
      if (!used.has(idx) && !group.has(s)) {
        total += s.getScore()
        group.add(s)
      }

      // If the addition gets us the goal value return the group
      if (total == value) {
        return group
      // If we go over the goal then reset everything so we can try again
      } else if (total > value) {
        total = 0
        used.clear()
        group.clear()
      }
    }
    return undefined
  }
}

