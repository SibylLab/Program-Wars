let playerModalTimer = 2;//sec
let endTurnTimer = 1.5;//sec

export default {
  playerTookTurn(context) {
    context.commit('removeActiveCardFromHand');
    context.commit('setHasPlayed', {hasPlayed: true});
    context.commit('setPlayerScores')
  },
  endTurn(context, payload) {
    setTimeout(() => {
      if (context.state.winner) {
        context.commit('winnerModalTrigger');
      } else if(!(context.state.winner)){
        context.commit('setHasPlayed', {hasPlayed: false});
        context.commit('endTurn', payload.players);
        context.commit('setGameState', {gameState: 'startPlayerTurn'});
        if (payload.isLast) {
          console.log('actions line 19')
        }
        context.commit('playerModalTrigger');
        setTimeout(() => {
          context.commit('playerModalHide');
        }, playerModalTimer * 1000);
      }
    }, endTurnTimer * 1000)
  },
  coinFlipWinCheck(context) {
    context.commit('checkWin');
    if(context.state.winner) {
      context.commit('playerModalHide');
      context.commit('winnerModalTrigger');
    }
  }
}


// export default {
//     // purpose of actions in allow async code
//     addTodo(context, todoObj) {
//         // run async code here
//
//
//         context.commit('addTodo', todoObj)
//
//
//     },
//     removeTodo(context, todoId) {
//
//         context.commit('removeTodo', todoId)
//     },
//     toggleComplete(context, todoId) {
//       context.commit('toggleComplete', todoId)
//
//
//       setTimeout(() => {
//       }, 250);
//     }
// }
