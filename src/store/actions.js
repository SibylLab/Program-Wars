export default {
  discardEnd(context) {
    context.commit('discardSelectedCard')
    context.commit('removeActiveCardFromHand')
    context.commit('setHasPlayed', {hasPlayed: true})
    context.commit('setPlayerScores')
    context.commit('checkWin');
  },
  hackEnd(context) {

  },
  stackEnd(context, payload) {
    context.commit('addCardToStack', {stackId: payload.stackId, card: payload.card})
    context.commit('removeActiveCardFromHand')
    context.commit('addStackToPlayer', {playerId: payload.playerId, boolSide: payload.boolSide})
    context.commit('setHasPlayed', {hasPlayed: true})
    context.commit('setPlayerScores')
    context.commit('checkWin');
  },
  groupEnd(context, payload) {
    context.commit('addCardToStack', {stackId: payload.stackId, card: payload.card})
    context.commit('removeActiveCardFromHand')
    context.commit('addStackToPlayer', {playerId: payload.playerId, boolSide: payload.boolSide})
    context.commit('setHasPlayed', {hasPlayed: true})
    context.commit('setPlayerScores')
    context.commit('checkWin');
    context.commit('groupStacks', {yesOrNo: false})

  },
  endTurn(context, payload) {
    setTimeout(() => {
      context.commit('setHasPlayed', {hasPlayed: false});
      context.commit('endTurn', payload);
      context.commit('setGameState', {gameState: 'startPlayerTurn'});
    },1500)
  },
  displayModal(payload) {
    if(payload.winner) {
      $('.winner').modal('show');
    } else {
      $('#playerTurn').modal('show');
      setTimeout(() => {
        $('#playerTurn').modal('hide');
      },2000)
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
