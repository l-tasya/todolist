import {addTodoListAC, changeTodoListTitleAC, removeTodoListAC, setFilterAC, todoListReducer,} from "./todoListReducer";
import {FilterType, TodoListReducerType} from "../../common/types/types";
const startState: TodoListReducerType = [
    {
        id: "1",
        title: "What to Learn",
        order: 0,
        filter: "All"
    },
    {
        id: "2",
        title: "What to Play",
        order: -1,
        filter: "Completed"
    },
]
test("todoList reducer should change filter", () => {
    let newValue: FilterType = "Active"
    let todo1 = startState[0].id
    const endState = todoListReducer(startState, setFilterAC(todo1, newValue))

    expect(endState.find(t => t.id === todo1)?.filter).toBe(newValue)
})
test("todoListReducer should remove TodoList", () => {
    let todo1 = startState[0].id
    const endState = todoListReducer(startState, removeTodoListAC(todo1))
    expect(endState.length).toEqual(1)
})
test("todoListReducer should add TodoList", () => {
    const newItem = "What to watch";
    const endState = todoListReducer(startState, addTodoListAC(newItem))
    expect(endState.length).toEqual(startState.length + 1)
    expect(endState[0].title).toBe(newItem)

})
test("todoListReducer change correct todoList title", () => {
    const newItem = "New Title for todolist";
    let todoID = startState[0].id
    const endState = todoListReducer(startState, changeTodoListTitleAC(todoID, newItem))
    expect(endState[0].title).toBe(newItem)

})