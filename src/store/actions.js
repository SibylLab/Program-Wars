let playerModalTimer = 2;//sec
let endTurnTimer = 1.5;//sec

export default {
  playerTookTurn(context) {
    context.commit('removeActiveCardFromHand');
    context.commit('setHasPlayed', {hasPlayed: true});
    context.commit('setPlayerScores')
  },
  // endTurn(context) {
  //   setTimeout(() => {
  //     if (context.state.winner) {
  //       context.commit('winnerModalTrigger');
  //     } else if (!(context.state.winner)) {
  //       context.commit('setHasPlayed', {hasPlayed: false});
  //       context.commit('endTurn', context.state.players.length);
  //       context.commit('setGameState', {gameState: 'startPlayerTurn'});
  //       if (context.state.isLast) {
  //         console.log('actions line 19')
  //       }
  //       context.commit('playerModalTrigger');
  //       setTimeout(() => {
  //         context.commit('playerModalHide');
  //       }, playerModalTimer * 1000);
  //     }
  //   }, endTurnTimer * 1000)
  // },
  turn(context, payload) {
    context.commit('checkWin');
    context.commit('getIsLast');
    if (!(payload)) {
      $('.coin').modal('show');
      setTimeout(() => {
        context.commit('setCoinFlipAnim', 1);
      },200);
      setTimeout(() => {
        $('.coin').modal('hide');
        context.commit('setCoinFlipAnim', 0);
      }, 1100);
      if (context.state.winner) {
        context.commit('playerModalHide');
        context.commit('winnerModalTrigger');
      } else {
        setTimeout(() => {
          context.commit('playerModalTrigger');
          setTimeout(() => {
            context.commit('playerModalHide');
          }, playerModalTimer * 1000);
        }, 1600)
      }
    } else {
      setTimeout(() => {
// =======
//       if (context.state.winner) {
//         context.commit('playerModalHide');
//         context.commit('winnerModalTrigger');
//       } else {
//         context.commit('playerModalTrigger');
//         setTimeout(() => {
//           context.commit('playerModalHide');
//         }, playerModalTimer * 1000);
//       }
//     } else {
//       setTimeout(() => {
// >>>>>>> master
        if (context.state.winner) {
          context.commit('winnerModalTrigger');
        } else if (!(context.state.winner)) {
          context.commit('setHasPlayed', {hasPlayed: false});
          context.commit('endTurn', context.state.players.length);
          context.commit('setGameState', {gameState: 'startPlayerTurn'});
          if (context.state.isLast) {
            // $('.coin').modal('show');
            // console.log('actions line 19')
            return '';
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
