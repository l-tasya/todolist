import {todoList1, todoList2, TodoListsType} from "../../App";


type StateType = TodoListsType

const initialState: StateType = [
    {id: todoList1, title: "What to Learn", filter: "All"},
    {id: todoList2, title: "What to Play", filter: "Completed"},
]

export const todoListReducer = (state: StateType = initialState, action: any):StateType =>{
    switch(action){
        default:{
            return state
        }
    }
}