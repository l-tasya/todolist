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
        case "SET-FILTER":{
            const stateCopy = [...state]
            const todoList = stateCopy.find(t=>t.id === action.todoListID)
            if(todoList){
                todoList.filter = action.newValue
            }
            return stateCopy
        }
        case "REMOVE-TODO-LIST":{
            const stateCopy = [...state]
            return stateCopy.filter(t=> t.id !== action.todoListID)
        }
        case "ADD-TODO-LIST":{
            const stateCopy = [...state]
            const newItem: ITodoListDomain = {id: action.id, title: action.newValue, order: -9, filter: 'All'}
            return [newItem, ...stateCopy]
        }
        case "CHANGE-TODO-LIST-TITLE":{
            const stateCopy = [...state]
            const todoList = stateCopy.find(t=>t.id === action.todoListID)
            if(todoList){
                todoList.title = action.newValue
            }
            return stateCopy
        }
        case "SET-TODO-LISTS":{
            return action.items.map((t): ITodoListDomain=>({...t, filter: "All"}))
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


