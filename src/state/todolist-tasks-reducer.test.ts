import {TasksType, TodoListType} from "../App";
import {addTodoListAC, todolistReducer} from "./todolistReducer";
import {tasksReducer} from "./tasksReducer";

test('ids should be equals', ()=>{
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodoListType> = []

    const action = addTodoListAC('nomatter')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id


    expect(idFromTasks).toBe(action.id)
    expect(idFromTodolists).toBe(action.id)
})