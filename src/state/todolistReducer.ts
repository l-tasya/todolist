import {FilterType, TodoListType} from '../App';
import {v1} from 'uuid';


type ActionsType = ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof ChangeTodoListTitleAC>
    | ReturnType<typeof ChangeTodoListFilterAC>

export const todolistReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            let result = state.filter(t => t.id !== action.id)
            return [...result]
        case 'ADD-TODOLIST':
            let temp: TodoListType = {
                id: v1(),
                filter: 'all',
                title: action.title
            }
            return [temp, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.title = `${action.newTitle}`
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let curr = state.find(t => t.id === action.id);
            if (curr) {
                curr.filter = action.newFilter;
            }
            return [...state]
        default:
            throw new Error('I don\'t understand this action type')
    }

}
export let RemoveTodoListAC = (removeId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: removeId,
    } as const
}
export let AddTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    } as const
}
export let ChangeTodoListTitleAC = (newTitle: string, id: string) =>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        newTitle: newTitle
    } as const
}
export let ChangeTodoListFilterAC = (newFilter: FilterType, id: string) =>{
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        newFilter: newFilter,
        id: id,
    } as const
}