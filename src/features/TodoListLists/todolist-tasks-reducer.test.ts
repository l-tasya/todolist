import {ITodoList, ITodoListDomain} from "../../api/types";
import {TasksReducerType} from "../../common/types/types";
//TODO: clear commentary
import {todoListActions} from "./index";
import {slice as taskSlice,} from "./tasksReducer";
import { slice as todoSlice} from "./todoListReducer";

const startTasksState: TasksReducerType = {}
const startTodoListsState: Array<ITodoListDomain> = []

export const a = 3;
const tasksReducer = taskSlice.reducer
const todoListReducer = todoSlice.reducer

const {addTodoListTC} = todoListActions
test("ids should be equals", () => {
    let todo: ITodoList = {
        id: 'test',
        title: 'test',
        order: 0,
        addedDate: ''

    }
    const action = addTodoListTC.fulfilled(todo, '', todo.title)
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)
    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id
    expect(idFromTasks).toBe(todo.id)
    expect(idFromTodoLists).toBe(todo.id)
})
