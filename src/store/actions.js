let playerModalTimer = 2; //sec
let endTurnTimer = 1.5; //sec
let coinTimer = 2; //sec

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
    context.state.coinMsg = 'Evaluating...'
    switch(payload) {
      case true:
        if(context.state.winner) {
          context.commit('winnerModalTrigger');
          return '';
        } else if(context.state.isLast) {
          setTimeout(() => {
            context.commit('setHasPlayed', {hasPlayed: false});
            context.commit('endTurn', context.state.players.length);
            context.commit('setGameState', {gameState: 'startPlayerTurn'});
            return '';
          }, endTurnTimer * 1000)
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
        context.commit('coinModalTrigger')
        context.commit('setCoinFlipAnim', 0)
        setTimeout(() => {context.commit('setCoinFlipAnim', 1)}, 200);
        setTimeout(() => {context.state.coinMsg = context.state.activeSide ? 'True' : 'False'}, 1200)
        // context.commit('setCoinFlipAnim', 1)
        setTimeout(() => {
          $('.coin').modal('handleUpdate');
          $('.coin').modal('hide');
          if(context.state.winner) {
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
//
//     if (!(payload)) {
//       context.commit('setCoinFlipAnim', 0);
//       $('.coin').modal('show');
//       context.commit('setCoinFlipAnim', 1);
//       setTimeout(() => {
//         $('.coin').modal('hide');
//       }, 1100)
//       // setTimeout(() => {
//       //   context.commit('setCoinFlipAnim', 1);
//       // },100);
//       // setTimeout(() => {
//       //   $('.coin').modal('hide');
//       //   context.commit('setCoinFlipAnim', 0);
//       // }, 1100);
//       if (context.state.winner) {
//         context.commit('playerModalHide');
//         context.commit('winnerModalTrigger');
//       } else {
//         setTimeout(() => {
//           context.commit('playerModalTrigger');
//           setTimeout(() => {
//             context.commit('playerModalHide');
//           }, playerModalTimer * 1000);
//         }, 1250)
//       }
//     } else {
//       setTimeout(() => {
// // =======
// //       if (context.state.winner) {
// //         context.commit('playerModalHide');
// //         context.commit('winnerModalTrigger');
// //       } else {
// //         context.commit('playerModalTrigger');
// //         setTimeout(() => {
// //           context.commit('playerModalHide');
// //         }, playerModalTimer * 1000);
// //       }
// //     } else {
// //       setTimeout(() => {
// // >>>>>>> master
//         if (context.state.winner) {
//           context.commit('winnerModalTrigger');
//         } else if (!(context.state.winner)) {
//           context.commit('setHasPlayed', {hasPlayed: false});
//           context.commit('endTurn', context.state.players.length);
//           context.commit('setGameState', {gameState: 'startPlayerTurn'});
//           if (context.state.isLast) {
//             // $('.coin').modal('show');
//             // console.log('actions line 19')
//             return '';
//           } else {
//             context.commit('playerModalTrigger');
//             setTimeout(() => {
//               context.commit('playerModalHide');
//             }, playerModalTimer * 1000);
//           }
//         }
//
//       }, endTurnTimer * 1000)
//     }
  }
}
