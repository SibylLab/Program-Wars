//import { bus } from '@/components/SharedComponents/Bus'
import Timer from 'easytimer'
import Player from '@/classes/game/Player'
import Deck from '@/classes/game/Deck'


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
  },

  // Setup a mock game adding a few componets to players, hands, stacks, etc.
  // This is only for testing purposes while rebuilding the UI and should
  // be removed afterward.
  setupMockGame (state) {
    state
    console.log("Mock Game")
  }
}
