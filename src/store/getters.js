export default {
        getCurrentPlayerHand(state) {
          return Object.assign({}, state.hands.find(hand => hand.playerId === state.activePlayer))
        },
        getCurrentPlayerId(state) {
          return state.activePlayer
        },
        maxplayers(state) {
          return state.players.length
        },
        topCard(state){//added way to draw the top card from the deck -Lance
          if(!state.deck.cards.length){
            return state.deck.draw();
          }
          else(
            console.log('The deck was empty, that shouldnt have happened...')
          )
        },
        currentPlayerName(state)
        {
          if(state.players.length)
            return state.players.find(player => player.id === state.activePlayer).name;
          else
            return ''
        },
        getCurrentPlayerStacks(state) {
          if(state.stacks.length)
            return state.stacks.filter(st => st.playerId === state.activePlayer)
          else
            return
        },
        getActiveCard(state) {
          return state.activeCard
        },
        getStacks(state) {
          return state.stacks
        },
        getPlayers(state) {
          return state.players
        },
        getDiscard(state) {
          return state.deck.discard_cards
        },
        getHasPlayed(state) {
          return state.activeHasPlayed
        },
        getgameState(state) {
          return state.currentGameState
        },
        getSelectedStacks(state) {
          let selectedStacks = []
          for (let stackId of state.selectedStacks){
            selectedStacks.push(state.stacks.find(stack => stack.stackId === stackId))
          }
          return selectedStacks
        },
        getSelectedStacksBoolean(state) {
          return state.selectedStackBoolean
        },
        getActiveSide(state) {
          return state.activeSide
        },
        getScoreLimit(state) {
          return state.scoreLimit
        },
        groupStacks(state) {
          return state.groupStacks
        },
        trueFalseAnim(state) {
          return state.trueFalseAnim
        },
        getWinner(state) {
          return state.winner
        },
        getTips(state) {
          return state.tips
        },
        getCurrentOpponents(state) {
          let players = state.getPlayers;
          for(let player of players) {
            if(player.id !== state.currentId) {
              state.currentOpponents.push(player);
            }
          }
          return state.currentOpponents;
        },
        getIsLast(state) {
          if((state.activePlayer + 1) % state.players.length === 0) {
            state.isLast = true;
          } else {
            state.isLast = false;
          }
          return state.isLast;
        }

}

