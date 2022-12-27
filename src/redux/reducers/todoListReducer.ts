import {v1} from "uuid";

export type FilterType = "All" | "Completed" | "Active"
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TodoListsType = TodoListType[]
export type TodoListsStateType = TodoListsType
type StateType = TodoListsType

export const todoList1 = v1()
export const todoList2 = v1()
const initialState: StateType = [
    {id: todoList1, title: "What to Learn", filter: "All"},
    {id: todoList2, title: "What to Play", filter: "Completed"},
]

export const todoListReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case "SET-FILTER":{
            const stateCopy = [...state]
            const todoList = stateCopy.find(t=>t.id === action.todoListID)
            if(todoList){
                todoList.filter = action.newValue
            }
            return stateCopy
        }
        case "REMOVE-TODOLIST":{
            let stateCopy = [...state]
            return stateCopy.filter(t=> t.id !== action.todoListID)
        }

        default: {
            return state
        }
    }
}

type ActionsType = ReturnType<typeof setFilterAC>
    |ReturnType<typeof removeTodoListAC>

export const setFilterAC = (todoListID: string, newValue: FilterType) =>{
    return {
        type: 'SET-FILTER',
        todoListID,
        newValue,
    } as const
}
export const removeTodoListAC = (todoListID: string) =>{
    return {
        type: 'REMOVE-TODOLIST',
        todoListID,
    } as const
}

