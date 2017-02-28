const uuidV1 = require('uuid/v1');


export default {
        addPlayer(state, todoString) {
            const date = new Date

            const todo = {
                text: todoString,
                id:   uuidV1(),
                date: date,
                complete: false,
                deleted: false
            }

            state.todos.push(todo)

        },
        removeTodo(state, todoId) {
          const updateTodo = state.todos.find(td => td.id === todoId)
          console.log(todoId)

          updateTodo.deleted = true;

        },
        toggleComplete(state, todoId) {
          const updateTodo = state.todos.find(td => td.id === todoId)

          console.log(todoId)

          updateTodo.complete = !updateTodo.complete;

        },
        restoreTodo(state, todoId) {
          const updateTodo = state.todos.find(td => td.id === todoId)
          console.log(todoId)

          updateTodo.deleted = false;
        },
        setCurrentPlayer(state, playerId) {
          state.activePlayer = playerId

        },
        endTurn(state) {
          state.activePlayer += 1
          state.activePlayer = state.activePlayer % state.maxPlayers
          console.log(state.activePlayer)


        }

}
