import { bus } from '@/components/shared/Bus'
import router from '@/router'

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
    context.commit('newTimer')
    context.commit('addPlayers', payload)
    context.commit('setStartingPlayer')
    context.commit('createNewDeck', {numPlayers: context.state.players.length})

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
    context.dispatch('resetForHome')
    context.commit('seenBackstory')
    router.push('home')
  },

  /**
   * Resets necessary elements before returning to landing page.
   */
  resetForHome (context) {
    context.commit('changeGameState', {newState: 'home'})
    context.commit('stopTimer')
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
    let draw = true
    if (payload.playType === "DISCARD") {
      context.commit('discardCard', payload)
    } else if (payload.playType === "REDRAW") {
      context.commit('giveNewHand', payload)
      draw = false
    } else {
      context.dispatch(payload.playType, payload)
    }

    context.commit('addPlayedCard', payload)
    bus.$emit('card-played')
    context.dispatch('endTurn', {draw: draw})
  },

  /**
   * Clean up after a players turn and change to the next player.
   * Emits events for game-over and end-turn when necessary.
   *
   * Payload
   * {
   *   draw: whether the player needs to draw a new card or not
   * }
   */
  endTurn (context, payload) {
    let scores = context.getters.getPlayerScores()
    for (let scoreInfo of scores) {
      if (scoreInfo.score >= context.state.scoreLimit) {
        bus.$emit('game-over')
        context.commit('changeGameState', {newState: 'winner'})
        return
      }
    }

    if (payload.draw) {
      context.commit('drawCard')
    }
    context.state.activeCard = undefined
    context.commit('nextPlayer')
    bus.$emit('end-turn')
  },

  /**
   * Add a card to a stack from the given players hand.
   * Payload same as executeTurn.
   */
  playCardOnStack (context, payload) {
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
    context.commit('addCardEffect', payload)
    context.commit('discardCard', payload)
  },

  /**
   * Adds the given group card as a new stack and removes all target stacks
   * that were used to make the group.
   * Payload same as executeTurn.
   */
  groupStacks (context, payload) {
    context.commit('removeStacks', {stacks: payload.target})
    context.commit('newStack', payload)
    context.commit('removeFromHand', payload)
  },

  /**
   * Hacks a target stack by removing it from the target players stacks and
   * discards the hack card.
   * Payload same as executeTurn.
   */
  hackStack (context, payload) {
    context.commit('removeStacks', {stacks: new Set([payload.target])})
    context.commit('discardCard', payload)
  }
}
