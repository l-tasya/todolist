import {setFilterAC, FilterType, todoListReducer, TodoListsStateType, removeTodoListAC} from "./todoListReducer";


test('todoList reducer should change filter', ()=>{

    const startState: TodoListsStateType = [
        {id: '1', title: "What to Learn", filter: "All"},
        {id: '2', title: "What to Play", filter: "Completed"},
    ]
    let newValue: FilterType = "Active"
    let todo1 = startState[0].id
    const endState = todoListReducer(startState, setFilterAC(todo1, newValue))

    expect(endState.find(t=>t.id === todo1)?.filter).toBe(newValue)
})
test('todoListReducer should remove TodoList', ()=>{
    const startState: TodoListsStateType = [
        {id: '1', title: "What to Learn", filter: "All"},
        {id: '2', title: "What to Play", filter: "Completed"},
    ]
    let todo1 = startState[0].id
    const endState = todoListReducer(startState, removeTodoListAC(todo1))
    expect(endState.length).toEqual(1)
})