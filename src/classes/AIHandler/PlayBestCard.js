/**
 * @file PlayBestCardAction.js file
 * @author Steven on 2020-06-10
 */

import ActionHandler from '@/classes/AIHandler/ActionHandler'
import helpers from '@/classes/AIHandler/aiHelpers'
import { isSafety, isNegativeEffect } from '@/classes/card/cardData'

/**
 * Attempts to play cards from an AI players hand based on a given
 * piority. Each card has a reasonable but simple strategy for attempting
 * to play it.
 *
 * If a card type is not included in the priority it will not be played
 * even if it is in the hand. This make it possible to make more complicated
 * ActionHandlers that can be added to the AIHandler if desired.
 */
export default class PlayBestCardAction extends ActionHandler {
  /**
   * Creates a new PlayBestCardAction class
   * @constructor PlayBestCardAction
   * @param player The player that this handler is for.
   * @param playOrder A list of cards type in the order that they should be
   * considered for play. Types not in the order will never be played.
   */
  constructor (playOrder) {
    super()
    this.playOrder = playOrder
    this.cardPriority = this.createOrder()
  }

  /**
   * Creates an object that maps card types to priorities to be used when
   * sorting the players hand.
   */
  createOrder () {
    const cardOrder = {}
    for (let i = 0; i < this.playOrder.length; i++) {
      cardOrder[this.playOrder[i]] = i
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
  handle (player, players, scores, deck) {
    const cards = this.sortHand(player.hand)
    for (const card of cards) {
      const type = card.type.toLowerCase()

      // Finding the correct method for this card type
      if (this.isValidCard(card)) {
        let move
        const args = { player, players, scores, deck }

        if (isSafety(card.type)) {
          move = this.playSafety(card, args)
        } else if (isNegativeEffect(card.type)) {
          move = this.playNegativeEffect(card, args)
        } else if (type in this) {
          move = this[type](card, args)
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
    this.sortCards(hand.cards)
    return hand.cards
  }

  sortCards (cards) {
    cards.sort((a, b) => {
      if (!(a.type in this.cardPriority)) { return 1 }
      else if (!(b.type in this.cardPriority)) { return -1 }

      if (a.type === b.type) {
        return b.value - a.value
      }
      return this.cardPriority[a.type] - this.cardPriority[b.type]
    })
  }

  isValidCard (card) {
    return card.type in this.cardPriority
  }

  /**
   * Make a move for an instruction card.
   * It is currently always possible to start a new instruction if a player
   * has an instruction card.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for starting a new stack with the given card.
   */
  instruction (card, { player }) {
    if (player.hurtBy('STACK_OVERFLOW')) { return undefined }

    if (!player.playField.method.isComplete()
        && card.value <= player.playField.method.toLimit()) {
      return {
        type: 'playOnStack',
        card: card,
        cardOwner: player,
        player: player,
        stack: player.playField.method,
      }
    }
    return undefined
  }

  method (card, { player }) {
    if (player.hurtBy('STACK_OVERFLOW')) { return undefined }

    return {
      type: 'newStack',
      card: card,
      cardOwner: player,
      player: player,
      playField: player.playField
    }
  }

  /**
   * Make a move for adding a repeat card to the largest stack that
   * is available.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for adding a repeat to a stack, or undefined if
   * no stack can be played on.
   */
  repeat (card, { player }) {
    if (player.hurtBy('STACK_OVERFLOW')) { return undefined }

    // get the stack with the largest score
    const stack = player.playField.stacks.filter((s) => {
      return s.willAccept(card)
    }).sort((a, b) => {
      return b.getScore() - a.getScore()
    }).shift()

    if (stack) {
      return {
        type: 'playOnStack',
        card: card,
        cardOwner: player,
        player: player,
        stack: stack
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
  variable (card, { player }) {
    if (player.hurtBy('STACK_OVERFLOW')) { return undefined }

    const stacks = player.playField.stacks.filter((s) => {
      return s.willAccept(card)
    })
    const stack = stacks.sort(helpers.varStackCompare).shift()

    if (stack) {
      return {
        type: 'playOnStack',
        card: card,
        cardOwner: player,
        player: player,
        stack: stack
      }
    }
    return undefined
  }

  /**
   * play a virus on another players stack under specific conditions.
   * Will not attack single card stacks as this is a waste. Picks the biggest
   * stack available that meets the criteria.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for hacking a stack, or undefined if
   * no stack can be attacked.
   */
  virus (card, { player, players }) {
    if (player.hurtBy('STACK_UNDERFLOW')) { return undefined }

    const opponents = players.filter(p => p !== player)
    let stacks = []
    for (const player of opponents) {
      if (!player.protectedFrom('VIRUS')) {
        stacks = stacks.concat(player.playField.stacks)
      }
    }

    const stack = stacks.filter((s) => {
      return s.cards.length > 1 && !s.isMethod && s.willAccept(card)
    }).sort((a, b) => {
      return b.getScore() - a.getScore()
    }).shift()

    if (stack) {
      return {
        type: 'playOnStack',
        card: card,
        cardOwner: player,
        player: player,
        stack: stack
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
  playSafety (card, { player }) {
    if (!player.helpedBy(card.type)) {
      if (card.type === 'SCAN') {
        const attacks = player.getAllAttacks()
        if (attacks.effects.length > 0 || attacks.virusStacks.length > 0
            || attacks.mimics.length > 0) {
          return this.playScan(card, attacks, player)
        }
      }

      return {
        type: 'playSpecialCard',
        card: card,
        cardOwner: player,
        player: player,
        target: player,
        targetType: 'player' // for scan
      }
    }

    return undefined
  }

  playScan (card, attacks, player) {
    const play = { type: 'playScan', player, card, cardOwner: player }

    const overflow = attacks.effects.find(e => e.card.type === 'STACK_OVERFLOW')
    if (overflow) {
      play.target = overflow
      play.targetType = 'effect'
    } else if (attacks.virusStacks.length > 0) {
      play.target = attacks.virusStacks.reduce((acc, stack) => {
        return acc.getScore() > stack.getScore() ? acc : stack
      }, attacks.virusStacks[0])
      play.targetType = 'stack'
    } else if (attacks.mimics.length > 0) {
      play.target = attacks.mimics.pop()
      play.targetType = 'mimic'
    } else {
      play.target = attacks.effects.pop()
      play.targetType = 'effect'
    }

    return play
  }
 
  /**
   * Play an attack card on the opponent with the highest score that
   * is not already attacked by or protected from the card.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for playing an attack, or undefined
   * no target can be found.
   */
  playNegativeEffect (card, { player, players, scores }) {
    if (player.hurtBy('STACK_UNDERFLOW')) { return undefined }

    const opponents = players.filter(p => p !== player)
    const target = opponents.filter((p) => {
      return !p.hurtBy(card.type) && !p.protectedFrom(card.type)
    }).sort((a, b) => {
      return scores[b.id] - scores[a.id]
    }).shift()

    if (target) {
      return {
        type: 'playSpecialCard',
        card: card,
        cardOwner: player,
        player: player,
        target: target
      }
    }
    return undefined
  }

  /**
   * Searches for cards based on the card priority.
   * May not be optimal as it is not certain that the player will need this
   * card, but it is a good default.
   */
  search (card, { player, deck }) {
    if (player.hurtBy('STACK_UNDERFLOW')) { return undefined }

    for (const type of this.playOrder) {
      const chosen = deck.cards.slice(0,card.value).find(c => c.type === type)
      if (chosen) {
        return {
          type: 'playSearch',
          player, card, cardOwner: player,
          chosenCard: chosen, deck
        }
      }
    }
    return undefined
  }

  /**
   * Sorts the top 5 cards according to it's play order.
   * This is not optimal in beginner and standard games as the player won't
   * be drawing every card themselves, but it will do for an easy default.
   */
  sort (card, { player, deck }) {
    if (player.hurtBy('STACK_UNDERFLOW')) { return undefined }

    const sortedCards = deck.drawCards(card.value)
    if (sortedCards) {
      this.sortCards(sortedCards)

      return {
        type: 'playSort',
        player, card, cardOwner: player,
        sortedCards, deck
      }
    }
    return undefined
  }
}

