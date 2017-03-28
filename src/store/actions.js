export default {
    // purpose of actions in allow async code
    addTodo(context, todoObj) {
        // run async code here


        context.commit('addTodo', todoObj)


    },
    removeTodo(context, todoId) {

        context.commit('removeTodo', todoId)
    },
    toggleComplete(context, todoId) {
      context.commit('toggleComplete', todoId)


      setTimeout(() => {
      }, 250);
    }
}
