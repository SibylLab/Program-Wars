export default {
        todos(state) {
            return state.todos.filter(todo => todo.deleted === false && todo.complete === false)
        },
        completedTodos(state) {
          return state.todos.filter(todo => {
              return todo.complete && !todo.deleted
          })
        },
        deletedTodos(state) {
          return state.todos.filter(todo => {
              return todo.deleted
          })
        },
        getCurrentPlayerHand(state) {
          return Object.assign({}, state.hands.find(hand => hand.playerId === state.activePlayer))
        },
        currentplayerturn(state) {
          return state.activePlayer
        },
        maxplayers(state) {
          return state.players.length
        }
}
