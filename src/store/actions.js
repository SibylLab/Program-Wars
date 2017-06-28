let playerModalTimer = 2;//sec
let endTurnTimer = 1.5;//sec

export default {
  playerTookTurn(context) {
    context.commit('removeActiveCardFromHand');
    context.commit('setHasPlayed', {hasPlayed: true});
    context.commit('setPlayerScores')
  },
  endTurn(context) {
    setTimeout(() => {
      if (context.state.winner) {
        context.commit('winnerModalTrigger');
      } else if (!(context.state.winner)) {
        context.commit('setHasPlayed', {hasPlayed: false});
        context.commit('endTurn', context.state.players.length);
        context.commit('setGameState', {gameState: 'startPlayerTurn'});
        if (context.state.isLast) {
          console.log('actions line 19')
        }
        context.commit('playerModalTrigger');
        setTimeout(() => {
          context.commit('playerModalHide');
        }, playerModalTimer * 1000);
      }
    }, endTurnTimer * 1000)
  },
  turn(context, payload) {
    context.commit('checkWin');
    context.commit('getIsLast');
    if (!(payload)) {
      if (context.state.winner) {
        context.commit('playerModalHide');
        context.commit('winnerModalTrigger');
      } else {
        context.commit('playerModalTrigger');
        setTimeout(() => {
          context.commit('playerModalHide');
        }, playerModalTimer * 1000);
      }
    } else {
      setTimeout(() => {
        if (context.state.winner) {
          context.commit('winnerModalTrigger');
        } else if (!(context.state.winner)) {
          context.commit('setHasPlayed', {hasPlayed: false});
          context.commit('endTurn', context.state.players.length);
          context.commit('setGameState', {gameState: 'startPlayerTurn'});
          if (context.state.isLast) {
            console.log('actions line 19')
          } else {
            context.commit('playerModalTrigger');
            setTimeout(() => {
              context.commit('playerModalHide');
            }, playerModalTimer * 1000);
          }
        }

      }, endTurnTimer * 1000)
    }
  }
}
