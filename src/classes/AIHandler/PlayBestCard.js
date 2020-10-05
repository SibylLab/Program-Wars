import ActionHandler from '@/classes/AIHandler/ActionHandler'
import helpers from '@/classes/AIHandler/aiHelpers'
import { isSafety, isNegativeEffect } from '@/classes/card/cardData'

/**
 * Attempts to play cards from an AI players hand based on a given card
 * piority. Each card has a reasonable but simple strategy for attempting
 * to play it. If a card type is not included in the priority list cards of that
 * type will never be played.
 *
 * This is sort of a mini version of the AIHandler except with methods instead
 * of modules. Its main purpose was to make a quick and easy ActionHandler
 * to cover most situations, but as such it is a large class and will get
 * out of hand quickly if a lot more unique cards are added. It does this
 * by using strings to index the object's instance to call methods for different
 * card types. This works, but feels a little complicated and different.
 * So with it's size and complexity it should probably be replaced with individual
 * handlers for card types eventually. Or maybe be used as a last link in the chain
 * before the default handler with handlers that target specific types of plays
 * rather than focusing on a single card type.
 *
 * [`handle`]{@link PlayBestCard#handle} is probably the only method that should be
 * considered **public**, but the others are left in the documentation to aid in
 * understanding class, and to show what type of `playInfo` object they return.
 * See {@link AIHandler} for more information on `playInfo` objects.
 *
 * @prop {Object} cardPriority - Maps card types to numerical priorities.
 * @extends ActionHandler
 */
class PlayBestCard extends ActionHandler {
  /**
   * Creates a new PlayBestCardAction handler.
   * @param {Player} player - The player that this handler is for.
   * @param {string[]} playOrder - A list of cards type in the order that they should be
   * considered for play. Types not in the order will **never** be played.
   */
  constructor (playOrder) {
    super()
    this.playOrder = playOrder
    this.cardPriority = this._createOrder()
  }

  /**
   * Creates an object from the playOrder list of types that maps these types
   * to priorities to be used to sort the players hand.
   * @return {Object} A map of card types to their numerical priorities.
   * These numbers start at 0 (play first) and end with the length of the
   * playOrder list - 1.
   * @private
   */
  _createOrder () {
    const cardOrder = {}
    for (let i = 0; i < this.playOrder.length; i++) {
      cardOrder[this.playOrder[i]] = i
    }
    return cardOrder
  }

  /**
   * Attempts to make a valid turn choice for the player.
   *
   * @param {Player} player - The player taking the action. 
   * @param {Player[]} players - A list of all players in the game.
   * @param {int[]} scores - A list of current player scores.
   * @param {Deck} deck - The deck the player is using.
   * @return {Object|undefined} A playInfo object for a turn, or `undefined`
   * if no valid play can be made.
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
   * Sorts the cards in the hand according to the card priorities.
   *
   * Does change the hand.
   *
   * @param {Hand} hand - The hand to sort.
   * @return {Card[]} The sorted list of cards.
   */
  sortHand (hand) {
    this._sortCards(hand.cards)
    return hand.cards
  }

  /**
   * Sorts a list of cards using the `cardPriority` object.
   *
   * Sorts by lowest priority and then by highest card value.
   * Cards types with no priority will move to back.
   * Modifies the given cards list.
   *
   * @param {Card[]} cards - The list of cards to sort.
   * @private
   */
  _sortCards (cards) {
    cards.sort((a, b) => {
      if (!(a.type in this.cardPriority)) { return 1 }
      else if (!(b.type in this.cardPriority)) { return -1 }

      if (a.type === b.type) {
        return b.value - a.value
      }
      return this.cardPriority[a.type] - this.cardPriority[b.type]
    })
  }

  /**
   * Checks to see if the given card's type is in the card priority list.
   * @param {Card} card - The card to check.
   * @return {bool} True if the type is in the priority list, false otherwise.
   */
  isValidCard (card) {
    return card.type in this.cardPriority
  }

  /**
   * Make a playInfo object for an instruction card if it can be played.
   *
   * Will only play on the method stack.
   *
   * @param {Card} card - The card to attempt to play.
   * @param {Object} state - An object with the state info needed to make this decision.
   * @param {Player} state.player - The player making the play.
   * @return {Object|undefined} A `playOnStack` playInfo object if a play could be made,
   * `undefined` otherwise.
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

  /**
   * Make a playInfo object for an method card if it can be played.
   *
   * @param {Card} card - The card to attempt to play.
   * @param {Object} state - An object with the state info needed to make this decision.
   * @param {Player} state.player - The player making the play.
   * @return {Object|undefined} A `new stack` playInfo object if a play could be made,
   * `undefined` otherwise.
   */
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
   * Make a playInfo object for an repeat card if it can be played.
   *
   * Always chooses the stack that will result in the largest point value.
   *
   * @param {Card} card - The card to attempt to play.
   * @param {Object} state - An object with the state info needed to make this decision.
   * @param {Player} state.player - The player making the play.
   * @return {Object|undefined} A `playOnStack` playInfo object if a play could be made,
   * `undefined` otherwise.
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
   * Make a playInfo object for an repeat card if it can be played.
   *
   * Will always choose unpaired `Rx` cards first, then it will look for stacks
   * with lower value `variable` cards to replace.
   *
   * @param {Card} card - The card to attempt to play.
   * @param {Object} state - An object with the state info needed to make this decision.
   * @param {Player} state.player - The player making the play.
   * @return {Object|undefined} A `playOnStack` playInfo object if a play could be made,
   * `undefined` otherwise.
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
   * Make a playInfo object for an virus card if it can be played.
   *
   * Will chose the largest stack from all unprotected opponents.
   *
   * @param {Card} card - The card to attempt to play.
   * @param {Object} state - An object with the state info needed to make this decision.
   * @param {Player} state.player - The player making the play.
   * @param {Player[]} state.players - All players in the game.
   * @return {Object|undefined} A `playOnStack` playInfo object if a play could be made,
   * `undefined` otherwise.
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
   * Make a playInfo object for to play a safety card on the player.
   *
   * @param {Card} card - The card to attempt to play.
   * @param {Object} state - An object with the state info needed to make this decision.
   * @param {Player} state.player - The player making the play.
   * @return {Object|undefined} A `playSpecial` or `playScan` playInfo object
   * if a play could be made, `undefined` otherwise.
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

  /**
   * Make a playInfo object for to play a safety card on the player.
   *
   * Prioritizes `BUFFER_OVERFLOW` (STACK_OVERFLOW still), then viruses,
   * then mimics, and then just removes the first negative effect on the player.
   *
   * @param {Card} card - The card to attempt to play.
   * @param {Object} attacks - All attacks on the player.
   * @param {StatusEffect[]} attacks.effects - List of negative effects on the player.
   * @param {Stack[]} attacks.virusStacks - List of the player's stacks that have viruses.
   * @param {Card[]} attacks.mimics - List of the player's mimicked cards.
   * @param {Player} player - The player being scanned.
   * @return {Object|undefined} A `playScan` playInfo object if a play could be made,
   * `undefined` otherwise.
   */
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
   * Make a playInfo object for adding a negative effect to an opponent if possible.
   *
   * Will chose the opponent with the highest total score that is not protected.
   *
   * @param {Card} card - The card to attempt to play.
   * @param {Object} state - An object with the state info needed to make this decision.
   * @param {Player} state.player - The player making the play.
   * @param {Player[]} state.players - All players in the game.
   * @return {Object|undefined} A `playSpecial` playInfo object if a play could be made,
   * `undefined` otherwise.
   */
  playNegativeEffect (card, { player, players }) {
    if (player.hurtBy('STACK_UNDERFLOW')) { return undefined }

    const opponents = players.filter(p => p !== player)
    const target = opponents.filter((p) => {
      return !p.hurtBy(card.type) && !p.protectedFrom(card.type)
    }).sort((a, b) => {
      return b.getScore() - a.getScore()
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
   * Make a playInfo object for searching the top N cards of the deck.
   *
   * Uses the the card priority to decide what order to look for cards. If it
   * can't find a card in the priority it will not play the card. This is a little
   * different than human players who if they activate the card must choose
   * something.
   *
   * @param {Card} card - The card to attempt to play.
   * @param {Object} state - An object with the state info needed to make this decision.
   * @param {Player} state.player - The player making the play.
   * @param {Deck} state.deck - The deck to search.
   * @return {Object|undefined} A `playSearch` playInfo object if a play could be made,
   * `undefined` otherwise.
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
   * Make a playInfo object for sorting the top N cards of the deck.
   *
   * Uses the same priority as it does to sort a hand. This is not perfect
   * for games where all players share a deck, but will perform better
   * for modes where each player has their own deck. However, it is good
   * enough for both and simple.
   *
   * @param {Card} card - The card to attempt to play.
   * @param {Object} state - An object with the state info needed to make this decision.
   * @param {Player} state.player - The player making the play.
   * @param {Deck} state.deck - The deck to sort cards from.
   * @return {Object|undefined} A `playSort` playInfo object if a play could be made,
   * `undefined` otherwise.
   */
  sort (card, { player, deck }) {
    if (player.hurtBy('STACK_UNDERFLOW')) { return undefined }

    const cardsToSort = deck.drawCards(card.value)
    this._sortCards(cardsToSort)

    return {
      type: 'playSort',
      card, cardOwner: player,
      sortedCards: cardsToSort,
      player, deck
    }
  }
}

export default PlayBestCard;
