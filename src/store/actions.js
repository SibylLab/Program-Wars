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
    context.commit('resetStateForGame')
    context.commit('addPlayers', payload)
    context.commit('setStartingPlayer')
    context.commit('createNewDeck')

    for (let p of context.state.players) {
      context.commit('giveNewHand', {player: p})
    }
    router.push('game')
  },

  /**
   * Leaves the current game and navigates back to home.
   * Any current game state may be lost.
   * Will reset any state information for starting a new game.
   */
  leaveGame (context) {
    context.commit('changeGameState', {newState: 'home'})
    context.commit('seenBackstory')
    router.push('home')
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

    let draw = true
    if (payload.playType === "DISCARD") {
      log.warn({DiscardBy:payload.player.name, card:payload.card.type, value: payload.card.value})
      context.commit('discardCard', payload)
    } else if (payload.playType === "REDRAW") {
      log.warn({RedrawBy:payload.player.name})
      context.commit('giveNewHand', payload)
      draw = false
    } else if (payload.card.isMimic) {
      context.dispatch('playMimic', payload)
    } else {
      log.warn({Player:payload.player.name, card_played:payload.card.type, value: payload.card.value})
      context.dispatch(payload.playType, payload)
    }

    context.commit('updatePlayerEffects', payload)
    context.commit('addPlayedCard', payload)

    context.commit('changeGameState', {newState: 'wait'})
    setTimeout(() => {
      if (draw) {
        context.commit('drawCard')
      }
      context.commit('changeGameState', {newState: 'game'})
      context.dispatch('endTurn')
    }, 1000)
  },

  /**
   * Clean up after a players turn and change to the next player.
   * Emits events for game-over and end-turn when necessary.
   */
  endTurn (context) {
    let scores = context.getters.getPlayerScores()
    for (let scoreInfo of scores) {
      if (scoreInfo.score >= context.state.scoreLimit) {
        //Winner Info added on log
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
    let scores = context.getters.getPlayerScores()

    let move = handler.chooseAction(hand, players, stacks, scores)
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
   * Adds the given group card as a new stack and removes all target stacks
   * that were used to make the group.
   * Payload same as executeTurn.
   */
  groupStacks (context, payload) {
    let stackValue= []
    for (let stack of payload.target.values()) {
      stackValue.push(stack.getScore())   
    }

    context.commit('removeStacks', {stacks: payload.target})
    context.commit('newStack', payload)
    context.commit('removeFromHand', payload)
    log.warn(payload.player.name, payload.card.type, payload.card.value, stackValue)
  },

  /**
   * Play a card that is mimicking another card.
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
  }
}
