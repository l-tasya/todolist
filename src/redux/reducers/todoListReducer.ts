import {v1} from "uuid";
import {FilterType, ITodoList, ITodoListDomain} from "../../common/types/types";
import {todoListsAPI} from "../../api/api";
import { Dispatch } from "redux";
import {AppStateType} from "../store/store";

export const todoID1 = v1();
export const todoID2 = v1();
const initialState: ITodoListDomain[] = []





export const todoListReducer = (state: ITodoListDomain[] = initialState, action: ActionsType): ITodoListDomain[] => {
    switch (action.type) {
        case 'SET-FILTER': {
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.newValue} : tl)
        }
        case 'REMOVE-TODO-LIST': {
            return state.filter(t => t.id !== action.todoListID)
        }
        case 'ADD-TODO-LIST': {
            const newItem: ITodoListDomain = {...action.item, entityStatus: 'idle', filter: 'All'}
            return [newItem, ...state]
        }
        case 'SET-TODO-LIST-ENTITY': {
            return state.map(tl => tl.id === action.todoListID ? {...tl, entityStatus: action.newValue} : tl)
        }
        case 'CHANGE-TODO-LIST-TITLE': {
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.newValue} : tl)
        }
        case 'SET-TODO-LISTS': {
            return action.items.map((t): ITodoListDomain => ({...t, filter: 'All', entityStatus: 'idle'}))
        }
        default: {
            return state
        }
    }
}

type ActionsType = ReturnType<typeof setFilterAC>
    |ReturnType<typeof removeTodoListAC>
    |ReturnType<typeof addTodoListAC>
    |ReturnType<typeof changeTodoListTitleAC>
    |ReturnType<typeof setTodoListsAC>


export const setTodoListsAC = (items: ITodoList[]) =>{
    return {
        type: 'SET-TODO-LISTS',
        items
    } as const
}
export const setFilterAC = (todoListID: string, newValue: FilterType) =>{
    return {
        type: 'SET-FILTER',
        todoListID,
        newValue,
    } as const
}
export const removeTodoListAC = (todoListID: string) =>{
    return {
        type: 'REMOVE-TODO-LIST',
        todoListID,
    } as const
}
export const addTodoListAC = (newValue: string) =>{
    return {
        type: 'ADD-TODO-LIST',
        id: v1(),
        newValue,

    } as const
}
export const changeTodoListTitleAC = (todoListID: string, newValue: string) =>{
    return {
        type: 'CHANGE-TODO-LIST-TITLE',
        todoListID,
        newValue,

    } as const
}



//thunk



export const setTodoListsTC = (dispatch: Dispatch, getState: ()=>AppStateType, extraArg: any) =>{
    todoListsAPI.getTodoLists().then((res)=>{
        dispatch(setTodoListsAC(res.data))
    })
}


