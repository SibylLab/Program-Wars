import Timer from 'easytimer'
import { bus } from '@/components/shared/Bus'
import Player from '@/classes/game/Player'
import Deck from '@/classes/game/Deck'
import Stack from '@/classes/game/Stack'


export default {
  /**
   * Resets all game related items in the state for a fresh game.
   * Creates an empty Deck so createDeck Will need to be called with
   * the number of players in the game.
   * Sets gameState to 'game'.
   * Should not affect non-game related settings.
   */
  resetStateForGame (state) {
    state.players = []
    state.stacks = []
    state.hands = []
    state.aiHandlers = []
    state.objectives = []
    state.deck = new Deck()
    state.gameState = 'game'
    state.activePlayer = undefined
    state.activeCard = undefined
    state.scoreLimit = 75
    state.tips = {showTips: true, factIndex: 0}
  },

  /**
   * Set the starting player for the game.
   */
  setStartingPlayer (state) {
    // Original game always let the AI start first. Any desired behaviour can
    // be set here to do that, but for now just pick the first player.
    state.activePlayer = state.players[0]
  },

  /**
   * Change the game state to a given new state.
   * Payload needs field -> newState: 'state'
   */
  changeGameState (state, payload) {
    state.gameState = payload.newState
  },

  /**
   * Create a new deck for a game with a certain number of players.
   */
  createNewDeck (state, payload) {
    state.deck = new Deck(payload.numPlayers)
  },

  /**
   * Toggle tips on and off.
   */
  toggleTips (state) {
    state.tips.showTips = !state.tips.showTips
  },

  /**
   * Setup a new timer.
   */
  newTimer (state) {
    state.timer = new Timer()
    state.timer.start()
    // eslint-disable-next-line no-unused-vars
    state.timer.addEventListener('secondsUpdated', function (e) {
      $('#basicUsage').html(state.timer.getTimeValues().toString())
    })
  },

  /**
   * Stop the current timer.
   */
  stopTimer (state) {
    if (state.timer) {
      state.timer.stop()
    }
  },

  /**
   * Uses a list of player information to create and add new players.
   */
  addPlayers(state, payload) {
    let playerInfo = payload.players
    for (let i = 0; i < playerInfo.length; i++) {
      let player = new Player(i, playerInfo[i].name, playerInfo[i].ai)
      state.players.push(player)
    }
  },

  /**
   * Give a player a new hand.
   * Can be used when they have no hand or to redraw a full hand.
   */
  giveNewHand (state, payload) {
    let player = payload.player

    // discard old hand if applicable
    let oldHand = state.hands.find(h => h.playerId === player.id)
    if (oldHand !== undefined) {
      for (let card of oldHand.cards) {
        state.deck.discard.push(card)
      }
    }

    // create and fill new hand
    let hand = {playerId: player.id, cards: []}
    while (hand.cards.length < 5) {
      let card = state.deck.draw()
      hand.cards.push(card)
    }

    state.hands = state.hands.filter(h => h.playerId !== player.id)
    state.hands.push(hand) 
    state.activeCard = undefined
  },

  /**
   * Set the current active card.
   */
  setActiveCard (state, payload) {
    state.activeCard = payload.newCard
    bus.$emit('card-selected')
  },

  /**
   * Move to the next player.
   */
  nextPlayer (state) {
    let id = state.activePlayer.id
    id = (id + 1) % state.players.length
    state.activePlayer = state.players.find(p => p.id === id)
  },

  /**
   * Draw a card from the deck and add it to the activePlayers hand.
   */
  drawCard (state) {
    let card = state.deck.draw()
    let hand = state.hands.find(h => h.playerId === state.activePlayer.id)
    hand.cards.push(card)
  },

  /**
   * Discard the active card from the current players hand.
   */
  discardActiveCard (state) {
    let hand = state.hands.find(h => h.playerId === state.activePlayer.id)
    hand.cards = hand.cards.filter(c => c !== state.activeCard)
    state.deck.discard.push(state.activeCard)
    state.activeCard = undefined
  },

  /**
   * Adds a given card effect to a player with the given id.
   * Must also be passed isPositive to know what kind of effect it is.
   */
  addCardEffect (state, payload) {
    let player = state.players.find(p => p.id === payload.playerId)
    if (payload.isPositive) {
      player.addPositive(payload.effect)
    } else {
      player.addNegative(payload.effect)
    }
  },

  /**
   * Remove a given card from the hand with the given playerID.
   */
  removeFromHand (state, payload) {
    let hand = state.hands.find(h => h.playerId === payload.playerId)
    hand.cards = hand.cards.filter(c => c.id != payload.card.id)
  },

  /**
   * Add a given card to a stack with the given stackId.
   * If replace is true the we replace the lowest variable card in the stack.
   */
  addToStack (state, payload) {
    let stack = state.stacks.find(s => s.stackId === payload.stackId)
    if (payload.replace) {
      let replaced = stack.replaceLowestVar(payload.card)
      state.deck.discard.push(replaced)
    } else {
      stack.cards.push(payload.card)
    }

    // If the stack is now complete move it to the end
    if (stack.isComplete()) {
      state.stacks = state.stacks.filter(s => s.stackId !== stack.stackId)
      state.stacks.push(stack)
    }
  },

  /**
   * Create a new stack with a given card and a given player id.
   */
  newStack (state, payload) {
    let stack = new Stack(payload.playerId)
    stack.cards.push(payload.card)

    // if card is group place it in front of any single isntruction stacks
    if (payload.card.type === "GROUP") {
      let plain = state.stacks.find((s) => {
        return s.cards.length === 1 && s.cards[0].type === "INSTRUCTION"
      })
      if (plain) {
        let idx = state.stacks.indexOf(plain)
        state.stacks.splice(idx, 0, stack)
        return
      }
    }

    // if card is a plain instruction or it is a group and there are no
    // single instruction stacks place card before any complete stacks
    let complete = state.stacks.find(s => s.isComplete())
    if (complete) {
      let idx = state.stacks.indexOf(complete)
      state.stacks.splice(idx, 0, stack)
    } else {
      state.stacks.push(stack)
    }
  },

  /**
   * Remove a Set of stacks from state.stacks and discard it's cards
   */
  removeStacks (state, payload) {
    state.stacks = state.stacks.filter(s => !payload.stacks.has(s))
    for (let stack of payload.stacks.values()) {
      for (let card of stack.cards) {
        state.deck.discard.push(card)
      }
    }
  },

  /**
   * Adds a given card to the active players objectives cards played.
   *
   */
  addPlayedCard (state, payload) {
    state.activePlayer.objectives.cardsPlayed.push(payload.card)
  }
}
