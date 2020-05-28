//import { bus } from '@/components/SharedComponents/Bus'
import Timer from 'easytimer'
import Player from '@/classes/Models/Player'
import Deck from '@/classes/Models/Deck'


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
    state.activePlayerId = 0
    state.activeCard = undefined
    state.scoreLimit = 5500
    state.tips = {showTips: true, factIndex: 0}
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

    let oldHand = state.hands.find(h => h.playerId === player.id)
    if (oldHand !== undefined) {
      for (let card of oldHand.cards) {
        state.deck.discard.push(card)
      }
    }

    let hand = {playerId: player.id, cards: []}
    while (hand.cards.length < 5) {
      let card = state.deck.draw()
      hand.cards.push(card)
    }

    state.hands = state.hands.filter(h => h.playerId !== player.id)
    state.hands.push(hand) 
    console.log(hand)
  },


  // Setup a mock game adding a few componets to players, hands, stacks, etc.
  // This is only for testing purposes while rebuilding the UI and should
  // be removed afterward.
  setupMockGame (state) {
    state.players[0].positiveEffects.add("GENERATOR")
    state.players[0].positiveEffects.add("BATTERYBACKUP")
    state.players[0].positiveEffects.add("OVERCLOCK")
    state.players[0].negativeEffects.add("POWEROUTAGE")
    state.players[0].negativeEffects.add("VIRUS")
    state.players[1].positiveEffects.add("FIREWALL")
    state.players[1].negativeEffects.add("POWEROUTAGE")
    console.log("Mock Game")
  }
}
