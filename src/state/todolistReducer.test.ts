import {v1} from 'uuid';
import {FilterType, TodoListType} from '../App';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistReducer
} from './todolistReducer';

test('correct todoList should be removed', ()=>{
    let todoListID1 = v1();
    let todoListID2 = v1();
    const startState: Array<TodoListType> = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'Sunday tasks', filter: 'all'},
    ]
    const endState = todolistReducer(startState, removeTodoListAC(todoListID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
})
test('correct todolist should be added', ()=>{
    let todoListID1 = v1();
    let todoListID2 = v1();
    const startState: Array<TodoListType> = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'Sunday tasks', filter: 'all'},
    ]
    let newTodoListTitle = 'Beautiful day'
    const endState = todolistReducer(startState, addTodoListAC(newTodoListTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[0].filter).toBe('all')
})
test('correct todolist should change its name', ()=>{
    let todoListID1 = v1();
    let todoListID2 = v1();
    const startState: Array<TodoListType> = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'Sunday tasks', filter: 'all'},
    ]
    let todoListNewTitle = 'MondayTasks'

    const endState = todolistReducer(startState, changeTodoListTitleAC(todoListNewTitle, todoListID2))
    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(todoListNewTitle)
})
test('correct todolist should change its filter', ()=>{
    let todoListID1 = v1();
    let todoListID2 = v1();
    const startState: Array<TodoListType> = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'Sunday tasks', filter: 'all'},
    ]
    let newFilter:FilterType = 'active'

    const endState = todolistReducer(startState, changeTodoListFilterAC(newFilter, todoListID2))
    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe(newFilter)
})