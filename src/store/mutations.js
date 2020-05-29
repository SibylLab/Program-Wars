import { bus } from '@/components/shared/Bus'
import Timer from 'easytimer'
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
  },

  /**
   * Set the current active card.
   */
  setActiveCard (state, payload) {
    state.activeCard = payload.newCard
  },

  /**
   * Remove a given card from a given players hand.
   */
  removeCardFromHand (state, payload) {
    let hand = state.hands.find(h => h.playerId === payload.player.id)
    hand.cards = hand.cards.filter(c => c !== payload.card)
  },

  /**
   * Discard the active card from the current players hand.
   */
  discardActiveCard (state) {
    let player = state.players.find(p => p.id === state.activePlayer.id)
    let hand = state.hands.find(h => h.playerId === player.id)
    hand.cards = hand.cards.filter(c => c !== state.activeCard)
    state.deck.discard.push(state.activeCard)
    state.activeCard = undefined
    bus.$emit('discard-active-card')
  },

  /**
   * Adds a given card effect to a player with the given id.
   * Must also be passed isPositive to know what kind of effect it is.
   */
  addCardEffect (state, payload) {
    let player = state.players.find(p => p.id === payload.playerId)
    if (payload.isPositive) {
      player.positiveEffects.add(payload.effect)
    } else {
      player.negativeEffects.add(payload.effect)
    }
    bus.$emit('played-effect', player.id)
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
   * If payload.replace is true we are removing the top card before adding
   * the given card.
   */
  addToStack (state, payload) {
    let stack = state.stacks.find(s => s.stackId === payload.stackId)
    if (payload.replace) {
      let top = stack.cards.pop()
      state.deck.discard.push(top)
    }
    stack.cards.push(payload.card)
  },

  // Setup a mock game adding a few componets to players, hands, stacks, etc.
  // This is only for testing purposes while rebuilding the UI and should
  // be removed afterward.
  setupMockGame (state) {
    let s1 = new Stack(0)
    s1.cards.push(state.deck.draw())
    s1.cards.push(state.deck.draw())
    s1.cards.push(state.deck.draw())
    s1.cards.push(state.deck.draw())
    state.stacks.push(s1)
    let s2 = new Stack(0)
    s2.cards.push(state.deck.draw())
    state.stacks.push(s2)
    let s3 = new Stack(0)
    s3.cards.push(state.deck.draw())
    s3.cards.push(state.deck.draw())
    s3.cards.push(state.deck.draw())
    state.stacks.push(s3)
    let s4 = new Stack(0)
    s4.cards.push(state.deck.draw())
    s4.cards.push(state.deck.draw())
    s4.cards.push(state.deck.draw())
    state.stacks.push(s4)
    let s5 = new Stack(0)
    s5.cards.push(state.deck.draw())
    s5.cards.push(state.deck.draw())
    s5.cards.push(state.deck.draw())
    state.stacks.push(s5)
    let s6 = new Stack(1)
    s6.cards.push(state.deck.draw())
    s6.cards.push(state.deck.draw())
    s6.cards.push(state.deck.draw())
    state.stacks.push(s6)
  }
}
