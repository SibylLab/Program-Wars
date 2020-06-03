import { bus } from '@/components/shared/Bus'
import router from '@/router'


export default {
  /**
   * Starts a new game.
   * Fully initializes a new state and navigates to the game page.
   * Payload needs field players wich is a list of objects
   * of the form {name: 'name', ai: bool}
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
   * Clean up after a players turn and change to the next player.
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
   * Add a card to a stack from the activePlayer's hand and end turn.
   */
  addCardToStack (context, payload) {
    context.commit('addPlayedCard', payload)
    context.commit('removeFromHand', payload)
    context.commit('addToStack', payload)
    bus.$emit('card-played')
    context.dispatch('endTurn', {draw: true})
  },

  /**
   * Add a new stack for a player from the activePlayer's hand and end turn.
   */
  addNewStack (context, payload) {
    context.commit('addPlayedCard', payload)
    context.commit('removeFromHand', payload)
    context.commit('newStack', payload)
    bus.$emit('card-played')
    context.dispatch('endTurn', {draw: true})
  },

  /**
   * Adds a given special card to the given player and ends the
   * activePlayer's turn.
   */
  addSpecialCard (context, payload) {
    context.commit('addPlayedCard', {card: context.state.activeCard})
    context.commit('addCardEffect', payload)
    context.commit('discardActiveCard')
    bus.$emit('card-played')
    context.dispatch('endTurn', {draw: true})
  },

  /**
   * Adds the given new group stack and removes all old stacks and
   * discards any given extra cards.
   */
  groupStacks (context, payload) {
    context.commit('addPlayedCard', {card: context.state.activeCard})
    context.commit('removeStacks', payload)
    context.commit('newStack', payload)
    context.commit('removeFromHand', payload)
    bus.$emit('card-played')
    context.dispatch('endTurn', {draw: true})
  },

  /**
   * Hack the given stack.
   */
  hackStack (context, payload) {
    context.commit('addPlayedCard', {card: context.state.activeCard})
    context.commit('removeStacks', {stacks: new Set([payload.stack])})
    context.commit('discardActiveCard')
    bus.$emit('card-played')
    context.dispatch('endTurn', {draw: true})
  }
}
