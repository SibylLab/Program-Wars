/**
 * This file includes all of the getter functions from the store to avoid directly manipulating the store.state
 */
export default {
  getCurrentPlayerHand (state) {
    return Object.assign({}, state.hands.find(hand => hand.playerId === state.activePlayer))
  },
  getCurrentPlayerId (state) {
    return state.activePlayer
  },
  maxplayers (state) {
    return state.players.length
  },
  currentPlayerName (state) {
    if (state.players.length) { return state.players.find(player => player.id === state.activePlayer).name } else { return '' }
  },

  getCurrentPlayerStacks (state) {
    if (state.stacks.length) { return state.stacks.filter(st => st.playerId === state.activePlayer) } else { return }
  },
  getActivePlayer (state) {
    return state.activePlayer
  },
  getActiveCard (state) {
    return state.activeCard
  },
  getStacks (state) {
    return state.stacks
  },
  getPlayers (state) {
    return state.players
  },
  getDiscard (state) {
    return state.deck.discard_cards
  },
  getIsDiscard (state) {
    return state.isDiscard
  },
  getIsHack (state) {
    return state.isHack
  },
  getAiTurn (state) {
    return state.aiTurn
  },
  getHackedPlayer (state) {
    return state.hackedPlayer
  },
  getCoinFlip (state) {
    return state.coinFlip
  },
  getHasPlayed (state) {
    return state.activeHasPlayed
  },
  getgameState (state) {
    return state.currentGameState
  },
  getSelectedStacks (state) {
    let selectedStacks = []
    for (let stackId of state.selectedStacks) {
      selectedStacks.push(state.stacks.find(stack => stack.stackId === stackId))
    }
    return selectedStacks
  },
  getSelectedStacksBoolean (state) {
    return state.selectedStackBoolean
  },
  getActiveSide (state) {
    return state.activeSide
  },
  getScoreLimit (state) {
    return state.scoreLimit
  },
  groupStacks (state) {
    return state.groupStacks
  },
  trueFalseAnim (state) {
    return state.trueFalseAnim
  },
  getWinner (state) {
    return state.winner
  },
  getWinnerName (state) {
    return state.winnerName
  },
  getWinnerScore (state) {
    return state.winnerScore
  },
  getTips (state) {
    return state.tips
  },
  getPlayerTurn (state) {
    return state.playerTurn
  },
  getCurrentPlayer (state) {
    return state.players[state.activePlayer]
  },
  getFirstRound (state) {
    return state.firstRound
  },
  getAiDependent (state) {
    let playerHand
    let playerStack = []
    let opponentStack = []
    let currentPlayer = state.players[state.activePlayer]
    for (let hand of state.hands) {
      if (currentPlayer.hand === hand.handId) {
        playerHand = hand
      }
    }
    for (let stack of state.stacks) {
      if (currentPlayer.id === stack.playerId) {
        playerStack.push(stack)
      } else {
        opponentStack.push(stack)
      }
    }
    return {hand: playerHand, stack: playerStack, opponents: opponentStack, player: currentPlayer, scoreLimit: state.scoreLimit}
  },
  getCoinMsg (state) {
    return state.coinMsg
  },
  getTutorialState (state) {
    return state.isTutorial
  },
  getFactIndex (state) {
    return state.factIndex
  },
  getTutorialStep (state) {
    return state.tutorialStep
  }
}

