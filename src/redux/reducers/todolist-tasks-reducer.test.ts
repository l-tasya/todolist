import {tasksReducer} from "./tasksReducer";
import {addTodoListAC, todoListReducer} from "./todoListReducer";
import {ITodoList, TasksReducerType, TodoListReducerType} from "../../common/types/types";


const startTasksState: TasksReducerType = {}
const startTodoListsState: TodoListReducerType = []

test("ids should be equals", () => {
    let newTODO = {id: 'd', addedDate: '', order: 0, title: 'test'}
    const action = addTodoListAC(newTODO)
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)
    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id
    expect(idFromTasks).toBe(newTODO.id)
    expect(idFromTodoLists).toBe(newTODO.id)
})
