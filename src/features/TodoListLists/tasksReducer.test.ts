import {v1} from "uuid";
import {TasksReducerType} from "../../common/types/types";
import {slice} from "./tasksReducer";
import {tasksActions} from "./index";
import {ITask, TaskPriorities, TaskStatuses} from "../../api/types";
import {RequestStatusType} from "../Application/app-reducer";


let startState: TasksReducerType;
let todoListID1: string;
let todoListID2: string;
const tasksReducer = slice.reducer
const {addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC, changeTaskEntity} = tasksActions
beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()
    startState = {
        [todoListID1]: [
            {
                id: v1(),
                title: 'JS',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: todoListID1,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'Redux',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: todoListID1,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'React',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: todoListID1,
                entityStatus: 'idle'
            },
        ],
        [todoListID2]: [
            {
                id: v1(),
                title: 'JS',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: todoListID2,
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'Redux',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: todoListID2,
                entityStatus: 'idle'
            },
        ]
    }
})


test('tasksReducer must add correct task', () => {
    let args = {
        todoListID: todoListID1,
        title: 'test'
    }
    let responseTask: ITask = {
        title: args.title,
        todoListId: args.todoListID,
        addedDate: '',
        id: 'test',
        status: TaskStatuses.Completed,
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: ''

    }

    const endState = tasksReducer(startState, addTaskTC.fulfilled(responseTask, '', args))
    expect(endState[args.todoListID].length).toEqual(startState[args.todoListID].length + 1)
})
test('tasksReducer must remove correct task', () => {
    let taskID = startState[todoListID1][1].id
    let args = {
        todoListID: todoListID1,
        taskID,
    }

    const endState = tasksReducer(startState, removeTaskTC.fulfilled(args, '', args))
    expect(endState[args.todoListID].length).toEqual(startState[args.todoListID].length - 1)
    expect(endState[args.todoListID].find(t => t.id === taskID)).toBe(undefined)

})
test('tasksReducer must fetch correct tasks', () => {
    let todoListID = todoListID1
    let initial = {}
    const endState = tasksReducer(initial, fetchTasksTC.fulfilled({
        todoListID,
        tasks: startState[todoListID]
    }, '', todoListID))
    expect(endState[todoListID]).toHaveLength(3)
    expect(endState[todoListID2]).toBe(undefined)
})
test('tasksReducer update task tile', () => {
    let taskID = startState[todoListID1][1].id
    let args = {
        todoListID: todoListID1,
        taskID,
        model: {
            title: 'test'
        }
    }

    const endState = tasksReducer(startState, updateTaskTC.fulfilled({...args}, '', {...args}))
    expect(endState[args.todoListID]).toHaveLength(3)
    expect(endState[args.todoListID].find(t => t.id === args.taskID)?.title).toBe(args.model.title)
})
test('tasksReducer update task checkbox', () => {
    let taskID = startState[todoListID1][1].id
    let args = {
        todoListID: todoListID1 as string,
        taskID: taskID as string,
        model: {
            status: TaskStatuses.Completed as TaskStatuses
        }
    }

    const endState = tasksReducer(startState, updateTaskTC.fulfilled({...args}, '', {...args}))
    expect(endState[args.todoListID]).toHaveLength(3)
    expect(endState[args.todoListID].find(t => t.id === args.taskID)?.status).toBe(args.model.status)
})
test('tasksReducer must change correct task entity', () => {
    let taskID = startState[todoListID1][1].id
    let args = {
        todoListID: todoListID1 as string,
        taskID: taskID as string,
        entity: 'succeeded' as RequestStatusType
    }
    const endState = tasksReducer(startState, changeTaskEntity({...args}))

    expect(endState[args.todoListID]).toHaveLength(3)
    expect(endState[args.todoListID].find(t => t.id === args.taskID)?.entityStatus).toBe(args.entity)
})