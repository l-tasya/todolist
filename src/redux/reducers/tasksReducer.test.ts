import {v1} from "uuid";
import {changeCheckBoxAC, removeTaskAC, tasksReducer, TasksStateType} from "./tasksReducer";

test('tasksReducer should remove correct task',()=>{
    const startState: TasksStateType = {
        ['1']: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Promises", isDone: true},
            {id: v1(), title: "Thunk", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
        ],
        ['2']: [
            {id: v1(), title: "Metro", isDone: false},
            {id: v1(), title: "Death Stranding", isDone: true},
        ]
    }
    const todoListID = Object.keys(startState)[0]
    const taskID = startState[todoListID][3].id
    console.log(todoListID)


    const endState = tasksReducer(startState, removeTaskAC(todoListID, taskID))
    expect(endState[todoListID].length).toBe(startState[todoListID].length-1)
})
test('tasksReducer should change checkbox',()=>{
    const startState: TasksStateType = {
        ['1']: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Promises", isDone: true},
            {id: v1(), title: "Thunk", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
        ],
        ['2']: [
            {id: v1(), title: "Metro", isDone: false},
            {id: v1(), title: "Death Stranding", isDone: true},
        ]
    }
    const todoListID = Object.keys(startState)[0]
    const taskID = startState[todoListID][3].id
    const newValue = false
    const endState = tasksReducer(startState, changeCheckBoxAC(todoListID, taskID, newValue))
    expect(endState[todoListID][3].isDone).toBe(newValue)
})


test('tasksReducer should title of correct task',()=>{
    const startState: TasksStateType = {
        ['1']: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Promises", isDone: true},
            {id: v1(), title: "Thunk", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
        ],
        ['2']: [
            {id: v1(), title: "Metro", isDone: false},
            {id: v1(), title: "Death Stranding", isDone: true},
        ]
    }
    const todoListID = Object.keys(startState)[0]
    const taskID = startState[todoListID][3].id
    const newValue = 'New Item'
    const endState = tasksReducer(startState, changeTaskTitleAC(todoListID,taskID, newValue))
    expect(endState[todoListID].find(t=>t.id === taskID)?.title).toBe(newValue)
})