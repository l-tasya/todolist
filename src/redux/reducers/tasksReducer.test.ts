import {v1} from "uuid";
import {changeCheckBoxAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";
import {TasksReducerType} from "../../common/types/types";

const startState: TasksReducerType = {
    ["1"]: [
        {
            id: v1(),
            title: "JS",
            completed: false,
            addedDate: Date,
            deadline: Date,
            description: "",
            order: 0,
            priority: 0,
            startDate: Date,
            status: 0,
            todoListId: '1'
        },
        {
            id: v1(),
            title: "Redux",
            completed: false,
            addedDate: Date,
            deadline: Date,
            description: "",
            order: 0,
            priority: 0,
            startDate: Date,
            status: 0,
            todoListId: '1'
        },
        {
            id: v1(),
            title: "React",
            completed: false,
            addedDate: Date,
            deadline: Date,
            description: "",
            order: 0,
            priority: 0,
            startDate: Date,
            status: 0,
            todoListId: '1'
        },
    ],
    ["2"]: [
        {
            id: v1(),
            title: "JS",
            completed: false,
            addedDate: Date,
            deadline: Date,
            description: "",
            order: 0,
            priority: 0,
            startDate: Date,
            status: 0,
            todoListId: '1'
        },
        {
            id: v1(),
            title: "Redux",
            completed: false,
            addedDate: Date,
            deadline: Date,
            description: "",
            order: 0,
            priority: 0,
            startDate: Date,
            status: 0,
            todoListId: '1'
        },
    ]
}
test("tasksReducer should remove correct task", () => {
    let todoListID = Object.keys(startState)[0]
    let taskID = startState[todoListID][0].id
    const endState = tasksReducer(startState, removeTaskAC(todoListID, taskID))

    expect(endState[todoListID].length).toBe(startState[todoListID].length - 1)
})
test("tasksReducer should change checkbox", () => {
    let todoListID = Object.keys(startState)[0]
    let taskID = startState[todoListID][0].id
    let newValue = false
    const endState = tasksReducer(startState, changeCheckBoxAC(todoListID, taskID, newValue))
    expect(endState[todoListID][0].completed).toBe(newValue)
})
test("tasksReducer should title of correct task", () => {
    let todoListID = Object.keys(startState)[0]
    let taskID = startState[todoListID][0].id
    let newValue = "New Item"
    const endState = tasksReducer(startState, changeTaskTitleAC(todoListID, taskID, newValue))
    expect(endState[todoListID].find(t => t.id === taskID)?.title).toBe(newValue)
})