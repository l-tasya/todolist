import {asyncTodoListActions, slice as todoListSlice} from "./todoListReducer"
import {asyncTaskActions, slice as tasksSlice} from "./tasksReducer"




const todoListReducer = todoListSlice.reducer
const tasksReducer = tasksSlice.reducer
const todoListActions = {
    ...todoListSlice.actions,
    ...asyncTodoListActions

}
const tasksActions = {
    ...tasksSlice.actions,
    ...asyncTaskActions,
}
export {
    tasksReducer,
    todoListReducer,
    tasksActions,
    todoListActions
}