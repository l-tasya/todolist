import {AllTasksType, tasksReducer} from "./tasksReducer";
import {addTodoListAC, todoListReducer, TodoListType} from "./todoListReducer";

test('ids should be equals', ()=>{
    const startTasksState: AllTasksType = {}
    const startTodolistsState: Array<TodoListType> = []

    const action = addTodoListAC('nomatter')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id


    expect(idFromTasks).toBe(action.id)
    expect(idFromTodolists).toBe(action.id)
})