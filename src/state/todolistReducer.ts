import {FilterType, TodoListType} from '../App';
import {v1} from 'uuid';


type ActionsType = ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof ChangeTodoListTitleAC>
    | ReturnType<typeof ChangeTodoListFilterAC>
    | ReturnType<typeof SetTodoListAC>

export const todolistReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
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
export let RemoveTodoListAC = (removeId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        removeId,
    } as const
}
export let AddTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        id: v1(),
    } as const
}
export let ChangeTodoListTitleAC = (newTitle: string, id: string) =>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        newTitle
    } as const
}
export let ChangeTodoListFilterAC = (newFilter: FilterType, id: string) =>{
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        newFilter,
        id,
    } as const
}
export let SetTodoListAC = (newValues: TodoListType[]) =>{
    return{
        type: 'SET-TODOLIST',
        newValues,
    } as const
}