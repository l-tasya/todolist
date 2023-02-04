import {tasksReducer} from "./tasksReducer";
import {addTodoListAC, todoListReducer} from "./todoListReducer";
import {TasksReducerType, TodoListReducerType} from "../../common/types/types";

test("ids should be equals", () => {
    const startTasksState: TasksReducerType = {}
    const startTodoListsState: TodoListReducerType = []

    const action = addTodoListAC("no matter")
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id


    expect(idFromTasks).toBe(action.id)
    expect(idFromTodoLists).toBe(action.id)
})