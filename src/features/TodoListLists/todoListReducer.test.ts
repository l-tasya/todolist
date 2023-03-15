import {FilterType, ITodoList, ITodoListDomain} from "../../api/types";
import {v1} from "uuid";
import {todoListActions} from "./index";
import {slice} from "./todoListReducer";
import {RequestStatusType} from "../Application/app-reducer";

let todolistId1: string
let todolistId2: string
const todoListReducer = slice.reducer
let startState: Array<ITodoListDomain> = []
const {
    removeTodoListTC,
    addTodoListTC,
    fetchTodoListsTC,
    changeTodoListTitleTC,
    changeTodolistFilter,
    changeTodolistEntityStatus
} = todoListActions

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0}
    ]
})
test('todolistReducer must remove correct todoList', () => {
    const endState = todoListReducer(startState, removeTodoListTC.fulfilled(todolistId1, '', todolistId1))
    expect(endState).toHaveLength(1)
})
test('todolistReducer must add correct todoList', () => {
    let todoList: ITodoList = {id: 'test', addedDate: '', order: -2, title: 'test'}
    const endState = todoListReducer(startState, addTodoListTC.fulfilled(todoList, '', todoList.title))
    expect(endState).toHaveLength(3)
})
test('todoLists must be fetched', () => {
    const endState = todoListReducer([], fetchTodoListsTC.fulfilled([...startState], '', undefined))
    expect(endState).toHaveLength(2)
})
test('todoListReducer must change correct todoList title', () => {
    let newTitle = 'test'
    let changeID = todolistId1
    const endState = todoListReducer(startState, changeTodoListTitleTC.fulfilled({
        todoListID: changeID,
        title: newTitle
    }, '', {todoListID: changeID, title: newTitle}))
    expect(endState).toHaveLength(2)
    expect(endState.find(t => t.id === changeID)!.title).toEqual(newTitle)
})
test('todoListReducer must change correct todoList filter', () => {
    let newFilter: FilterType = 'Completed'
    let changeID = todolistId1
    const endState = todoListReducer(startState, changeTodolistFilter({id: changeID, filter: newFilter}))
    expect(endState).toHaveLength(2)
    expect(endState.find(t => t.id === changeID)!.filter).toEqual(newFilter)
})
test('todoListReducer must change correct todoList entity', () => {
    let newEntity: RequestStatusType = "succeeded"
    let changeID = todolistId1
    const endState = todoListReducer(startState, changeTodolistEntityStatus({id: changeID, entity: newEntity}))
    expect(endState).toHaveLength(2)
    expect(endState.find(t => t.id === changeID)!.entityStatus).toEqual(newEntity)
})
