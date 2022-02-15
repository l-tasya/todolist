
import {v1} from 'uuid';
import {FilterType, TodoListType} from "../AppWithRedux";


type ActionsType = ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodoListAC>

const initialState: Array<TodoListType> = [
    {id: v1(), title: 'What to learn', filter: 'all'},
    {id: v1(), title: 'Sunday tasks', filter: 'all'},
]
export const todoListID1 = initialState[0].id
export const todoListID2 = initialState[1].id
export const todolistReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            const stateCopy = [...state]
            return stateCopy.filter(t=>t.id !== action.removeId)

        }
        case 'ADD-TODOLIST':{
            const stateCopy = [...state]
            let newTodoList: TodoListType = {
                id: action.id,
                filter: 'all',
                title: action.title
            }
            return [newTodoList, ...stateCopy]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            const stateCopy = [...state]
            const todoList = stateCopy.find(t=> t.id === action.id)
            if(todoList){
                todoList.title = `${action.newTitle}`
            }
            return stateCopy
        }
        case 'CHANGE-TODOLIST-FILTER':{
            const stateCopy = [...state]
            const todoList = stateCopy.find(t=> t.id === action.id)
            if(todoList){
                todoList.filter = action.newFilter
            }
            return stateCopy
        }
        case 'SET-TODOLIST':{
            return [...action.newValues]
        }
        default:
            return [...state]
    }

}
export let removeTodoListAC = (removeId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        removeId,
    } as const
}
export let addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        id: v1(),
    } as const
}
export let changeTodoListTitleAC = (newTitle: string, id: string) =>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        newTitle
    } as const
}
export let changeTodoListFilterAC = (newFilter: FilterType, id: string) =>{
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        newFilter,
        id,
    } as const
}
export let setTodoListAC = (newValues: TodoListType[]) =>{
    return{
        type: 'SET-TODOLIST',
        newValues,
    } as const
}