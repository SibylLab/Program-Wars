let playerModalTimer = 2;// sec
let endTurnTimer = 1.5;// sec
let coinTimer = 2;// sec

export default {
  playerTookTurn(context) {
    context.commit('removeActiveCardFromHand');
    context.commit('setHasPlayed', {hasPlayed: true});
    context.commit('setPlayerScores')
  },
  turn(context, payload) {
    // context.commit('checkWin');
    context.commit('getIsLast');
    context.state.coinMsg = 'Evaluating...';
    switch(payload) {
      case true:
        if(context.state.isLast) {
          // if (context.state.winner) {
          //   context.commit('winnerModalTrigger');
          //   return '';
          // } else {
            setTimeout(() => {
              context.commit('setHasPlayed', {hasPlayed: false});
              context.commit('endTurn', context.state.players.length);
              context.commit('setGameState', {gameState: 'startPlayerTurn'});
              return '';
            }, endTurnTimer * 1000)
          // }
        } else {
          setTimeout(() => {
            context.commit('setHasPlayed', {hasPlayed: false});
            context.commit('endTurn', context.state.players.length);
            context.commit('setGameState', {gameState: 'startPlayerTurn'});
            context.commit('playerModalTrigger');
            setTimeout(() => {
              context.commit('playerModalHide');
            }, playerModalTimer * 1000)
          }, endTurnTimer * 1000)
        }
        break;
      case false:
        context.commit('checkWin');

//         context.commit('coinModalTrigger');
//         context.commit('setCoinFlipAnim', 0);
//         setTimeout(() => {context.commit('setCoinFlipAnim', 1)}, 200);
//         setTimeout(() => {context.state.coinMsg = context.state.activeSide ? 'True' : 'False'}, 1200);
        setTimeout(() => {
//           $('.coin').modal('handleUpdate');
//           $('.coin').modal('hide');
          if (context.state.winner) {
            context.commit('winnerModalTrigger');
            return '';
          }
        }, coinTimer * 1000);
        if(!(context.state.winner)) {
          setTimeout(() => {
            context.commit('playerModalTrigger');
            setTimeout(()=> {
              context.commit('playerModalHide');
            }, playerModalTimer * 1000)
          }, coinTimer * 1000 + 350);
        }
        break;
    }
  }
}
