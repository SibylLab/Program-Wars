let playerModalTimmer = 2;//sec
let endTurnTimmer = 1.5;//sec

export default {
  playerTookTurn(context) {
    context.commit('removeActiveCardFromHand')
    context.commit('setHasPlayed', {hasPlayed: true})
    context.commit('setPlayerScores')
  },
  endTurn(context, payload) {
    setTimeout(() => {
      if (payload.isWinner) {
        // $('.winner').modal('show');
        context.commit('winnerModalTrigger');
      } else {
        context.commit('setHasPlayed', {hasPlayed: false});
        context.commit('endTurn', payload.players);
        context.commit('setGameState', {gameState: 'startPlayerTurn'});
        if (payload.isLast) {
          console.log('actions line 19')
        }
        // $('#playerTurn').modal('show');
        context.commit('playerModalTrigger')
        setTimeout(() => {
          // $('#playerTurn').modal('hide');
          context.commit('playerModalHide')

        }, playerModalTimmer * 1000);
      }
    }, endTurnTimmer * 1000)
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
