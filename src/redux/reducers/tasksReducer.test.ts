import {v1} from 'uuid';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTaskEntity,
    setTasksAC,
    tasksReducer
} from './tasksReducer';
import {ITaskDomain, TasksReducerType, TaskStatuses} from '../../common/types/types';
import {RequestStatusType} from './app-reducer';

const startState: TasksReducerType = {
    ['1']: [
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
            todoListId: '1',
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
            todoListId: '1',
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
            todoListId: '1',
            entityStatus: 'idle'
        },
    ],
    ['2']: [
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
            todoListId: '1',
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
            todoListId: '1',
            entityStatus: 'idle'
        },
    ]
}
test('tasksReducer should remove correct task', () => {
    let todoListID = Object.keys(startState)[0]
    let taskID = startState[todoListID][0].id
    const endState = tasksReducer(startState, removeTaskAC(todoListID, taskID))

    expect(endState[todoListID].length).toBe(startState[todoListID].length - 1)
})
test('tasksReducer should change status', () => {
    let todoListID = Object.keys(startState)[0]
    let taskID = startState[todoListID][0].id
    let newValue = TaskStatuses.Completed
    const endState = tasksReducer(startState, changeTaskStatusAC(todoListID, taskID, newValue))
    expect(endState[todoListID][0].status).toBe(newValue)
})
test('tasksReducer should change title of correct task', () => {
    let todoListID = Object.keys(startState)[0]
    let taskID = startState[todoListID][0].id
    let newValue = 'New Item'
    const endState = tasksReducer(startState, changeTaskTitleAC(todoListID, taskID, newValue))
    expect(endState[todoListID].find(t => t.id === taskID)?.title).toBe(newValue)
})