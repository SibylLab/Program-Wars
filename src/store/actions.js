import HomeState from '@/classes/states/HomeState'
import BeginnerGame from '@/classes/states/BeginnerGame'
import RequirementsState from '@/classes/states/RequirementsState'
import DeckSetupState from '@/classes/states/DeckSetupState'
import { bus } from '@/components/shared/Bus'
import router from '@/router'

// loging framework
const log = require('loglevel');

/**
 * All actions that are taken involving the vuex state.
 * These actions should be used when combining multiple mutations or
 * getters to make complex changes. Most often this will be for responses to
 * player turns or changes in game state.
 * Actions call mutations with context.commit and other actions with
 * context.dispatch. Pass the function name as the first argument as a string.
 */
export default {

  // Page setup //
  startHomePage (context) {
    context.state.gameState = 'home'  // temporary for side nav
    context.state.pageState = new HomeState()
    router.push('/')
  },

  startBeginnerGame (context, payload) {
    context.state.gameState = 'beginner'
    context.state.pageState = new BeginnerGame(payload.players)
    router.push('beginner')
  },

  startBasicGame (context, payload) {
    context.dispatch('basicGame', payload)  // temporarily start old game
  },

  startRequirements (context, payload) {
    context.state.gameState = 'requirements'
    context.state.pageState = new RequirementsState(payload.players)
    router.push('requirements')
  },

  startDeckSetup (context, payload) {
    context.state.gameState = 'decks'
    context.state.pageState = new DeckSetupState(payload.players)
    router.push('decks')
  },

  startAgileGame (context, payload) {
    context.state.gameState = 'agile'
    console.log(payload.players)
  },








  /**
   * Starts a new game.
   * Fully initializes a new state and navigates to the game page.
   *
   * Payload
   * {
   *   players: list of player info {name, isAi}
   * }
   */
  newGame (context, payload) {
    this.dispatch(payload.type, payload)
  },

  basicGame (context, payload) {
    context.commit('resetStateForGame')
    context.commit('addPlayers', payload)
    context.commit('setStartingPlayer')
    context.commit('createNewDeck')

    for (let p of context.state.players) {
      context.commit('giveNewHand', {player: p})
    }
    router.push('game')

    if (context.state.activePlayer.isAi) {
      setTimeout(() => {context.dispatch('takeAiTurn')}, 500)
    }
  },


  /**
   * Leaves the current game and navigates back to home.
   * Any current game state may be lost.
   * Will reset any state information for starting a new game.
   */
  leaveGame (context) {
    context.commit('changeGameState', {newState: 'home'})
    context.commit('seenBackstory')
    this.dispatch('startHomePage')
  },

  /**
   * Execute a players turn given the type of play, the card being played,
   * the player who's turn it is, and the target player/stack.
   * Emits a card-played event.
   *
   * Payload
   * {
   *   playType: a string for the action name to call,
   *   card: the card being played,
   *   player: the player taking the turn,
   *   target: the player or stack the card is being played on
   * }
   */
  executeTurn(context, payload) {
    if (context.state.gameState === 'wait') { return }
    bus.$emit('card-played', payload)
    context.state.turnPlays.push(payload)

    payload.draw = true
    if (payload.playType === "DISCARD") {
      log.warn({DiscardBy:payload.player.name, card:payload.card.type, value: payload.card.value})
      context.commit('discardCard', payload)
    } else if (payload.playType === "REDRAW") {
      log.warn({RedrawBy:payload.player.name})
      context.commit('giveNewHand', payload)
      payload.draw = false
    } else if (payload.card.isMimic) {
      context.dispatch('playMimic', payload)
    } else {
      log.warn({Player:payload.player.name, card_played:payload.card.type, value: payload.card.value})
      context.dispatch(payload.playType, payload)
    }

    context.dispatch('cleanUpTurn', payload)
  },


  /**
   * After the turns play has been executed deal with updates and card draws
   * as well as dispatching endTurn.
   *
   * Payload
   * {
   *   playType: a string for the action name to call,
   *   card: the card being played,
   *   player: the player taking the turn,
   *   target: the player or stack the card is being played on
   *   draw: whether or not to draw a card
   * }
   */
  cleanUpTurn (context, payload) {
    context.commit('updatePlayerEffects', payload)
    context.commit('addPlayedCard', payload)

    // Delay end turn so that it will allow players to see results of their play
    // before moving on.
    context.commit('changeGameState', {newState: 'wait'})
    setTimeout(() => {
      if (payload.draw) {
        context.commit('drawCard')
      }
      context.commit('changeGameState', {newState: 'game'})
      context.dispatch('endTurn')
    }, 1250)
  },

  /**
   * Clean up after a players turn and change to the next player.
   * Emits events for game-over and end-turn when necessary.
   */
  endTurn (context) {
    // Update scores and end game if someone has reached the limit
    let scores = context.getters.getPlayerScores()
    for (let scoreInfo of scores) {
      if (scoreInfo.score >= context.state.scoreLimit) {
        let winner = context.state.players.find (p => p.id === scoreInfo.playerId)
        log.warn({Winner:winner.name, WinnerScores:scoreInfo.score})

        bus.$emit('game-over')
        context.commit('changeGameState', {newState: 'winner'})
        return
      }
    }

    context.state.activeCard = undefined
    bus.$emit('end-turn')

    // Change active player and take AI turn if needed
    context.commit('nextPlayer')
    if (context.state.activePlayer.isAi) {
      setTimeout(() => {context.dispatch('takeAiTurn')}, 500)
    }
  },

  /**
   * Take an Ai Players Turn.
   */
  takeAiTurn (context) {
    let handler = context.getters.getCurrentAiHandler
    let hand = context.getters.getCurrentPlayerHand
    let players = context.state.players
    let stacks = context.state.stacks
    let method = context.getters.getCurrentMethod
    let scores = context.getters.getPlayerScores()

    let move = handler.chooseAction(hand, players, stacks, method, scores)
    context.dispatch('executeTurn', move)
    bus.$emit('ai-action', {move: move})
  },

  /**
   * Add a card to a stack from the given players hand.
   * Payload same as executeTurn.
   */
  playCardOnStack (context, payload) {
    log.warn(payload.player.name, payload.card.type, payload.card.value, payload.target.getScore())
    context.commit('removeFromHand', payload)
    context.commit('addToStack', payload)
  },

  /**
   * Add a new stack for a player from the activePlayer's hand and end turn.
   * Payload same as executeTurn.
   */
  startNewStack (context, payload) {
    context.commit('removeFromHand', payload)
    context.commit('newStack', payload)
  },

  /**
   * Adds a given special card effect to the target player and discards the card.
   * Payload same as executeTurn.
   */
  playSpecialCard (context, payload) {
    log.warn(payload.player.name, payload.card.type)
    context.commit('addCardEffect', payload)
    context.commit('discardCard', payload)
  },

  /**
    // get scores of all stacks we will group
   * Play a card that is mimicking another card.
   * Payload is same as execute turn, but will have mimic card discarded and
   * payload.card will be replaced with the card being mimicked.
   */
  playMimic (context, payload) {
    let card = payload.card.replace()
    let player = payload.card.player
    context.commit('discardCard', payload)
    payload.card = card

    if (card.type === "VIRUS") {
      context.dispatch('playCardOnStack', payload)
    } else {
      payload.target = payload.player
      payload.player = player
      context.dispatch('playSpecialCard', payload)
    }
  },


  // Agile game mode specific actions ////////////////////////////////////////

  agileGame (context, payload) {
    context.commit('resetStateForGame')
    context.state.gameState = 'requirements'
    context.commit('addPlayers', payload)
    router.push('agile_setup')
  },

  finishRequirements (context) {
    context.state.gameState = 'deck'
    router.push('deck_setup')
  },

  finishDecks (context) {
    // This just starts a normal game for now to get us to the next phase
    context.state.gameState = 'game'
    context.commit('setStartingPlayer')
    context.commit('createNewDeck')

    for (let p of context.state.players) {
      context.commit('giveNewHand', {player: p})
    }
    router.push('agile_game')

    if (context.state.activePlayer.isAi) {
      setTimeout(() => {context.dispatch('takeAiTurn')}, 500)
    }
  }
}
