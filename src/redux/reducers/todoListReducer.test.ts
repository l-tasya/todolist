import {changeFilterAC, FilterType, todoListReducer, TodoListsStateType} from "./todoListReducer";


test('todoList reducer should change filter', ()=>{
    let todo1 = '1'
    const startState: TodoListsStateType = [
        {id: todo1, title: "What to Learn", filter: "All"},
        {id: '2', title: "What to Play", filter: "Completed"},
    ]
    let newValue: FilterType = "Active"

    const endState = todoListReducer(startState, changeFilterAC(todo1, newValue))

    expect(endState.find(t=>t.id === todo1)?.filter).toBe(newValue)
})