
//TODO: clear commentary
export const a = 3;
// const startState: TodoListReducerType = [
//     {
//         id: "1",
//         title: "What to Learn",
//         order: 0,
//         filter: "All",
//         addedDate: '',
//         entityStatus: 'idle'
//     },
//     {
//         id: "2",
//         title: "What to Play",
//         order: -1,
//         filter: "Completed",
//         addedDate: '',
//         entityStatus: 'idle'
//     },
// ]
// test("todoList reducer should change filter", () => {
//     let newValue: FilterType = "Active"
//     let todo1 = startState[0].id
//     const endState = todoListReducer(startState, setFilterAC(todo1, newValue))
//
//     expect(endState.find(t => t.id === todo1)?.filter).toBe(newValue)
// })
// test("todoListReducer should remove TodoList", () => {
//     let todo1 = startState[0].id
//     const endState = todoListReducer(startState, removeTodoListAC(todo1))
//     expect(endState.length).toEqual(1)
// })
// test("todoListReducer should add TodoList", () => {
//     const newItem = {id: 'd', addedDate: '', order: 0, title: 'test'}
//     const endState = todoListReducer(startState, addTodoListAC({id: 'd', addedDate: '', order: 0, title: 'test'}))
//     expect(endState.length).toEqual(startState.length + 1)
//     expect(endState[0].title).toBe(newItem.title)
//
// })
// test("todoListReducer change correct todoList title", () => {
//     const newItem = "New Title for todolist";
//     let todoID = startState[0].id
//     const endState = todoListReducer(startState, changeTodoListTitleAC(todoID, newItem))
//     expect(endState[0].title).toBe(newItem)
//
// })
// test("todoListReducer should change correct entity", ()=>{
//     const newValue:RequestStatusType = 'loading';
//     let todoID = startState[0].id;
//     const endState = todoListReducer(startState, setTodoListEntityAC(todoID, newValue))
//     expect(endState[0].entityStatus).toEqual(newValue)
//
//})