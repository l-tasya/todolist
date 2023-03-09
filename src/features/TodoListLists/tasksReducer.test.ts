// const startState: TasksReducerType = {
//     ['1']: [
//         {
//             id: v1(),
//             title: 'JS',
//             addedDate: '',
//             deadline: '',
//             description: '',
//             order: 0,
//             priority: 0,
//             startDate: '',
//             status: 0,
//             todoListId: '1',
//             entityStatus: 'idle'
//         },
//         {
//             id: v1(),
//             title: 'Redux',
//             addedDate: '',
//             deadline: '',
//             description: '',
//             order: 0,
//             priority: 0,
//             startDate: '',
//             status: 0,
//             todoListId: '1',
//             entityStatus: 'idle'
//         },
//         {
//             id: v1(),
//             title: 'React',
//             addedDate: '',
//             deadline: '',
//             description: '',
//             order: 0,
//             priority: 0,
//             startDate: '',
//             status: 0,
//             todoListId: '1',
//             entityStatus: 'idle'
//         },
//     ],
//     ['2']: [
//         {
//             id: v1(),
//             title: 'JS',
//             addedDate: '',
//             deadline: '',
//             description: '',
//             order: 0,
//             priority: 0,
//             startDate: '',
//             status: 0,
//             todoListId: '1',
//             entityStatus: 'idle'
//         },
//         {
//             id: v1(),
//             title: 'Redux',
//             addedDate: '',
//             deadline: '',
//             description: '',
//             order: 0,
//             priority: 0,
//             startDate: '',
//             status: 0,
//             todoListId: '1',
//             entityStatus: 'idle'
//         },
//     ]
// }
//TODO: clear commentary
export const a = 3;
// test('tasksReducer should remove correct task', () => {
//     let todoListID = Object.keys(startState)[0]
//     let taskID = startState[todoListID][0].id
//     const endState = tasksReducer(startState, removeTaskAC(todoListID, taskID))
//
//     expect(endState[todoListID].length).toBe(startState[todoListID].length - 1)
// })
// test('tasksReducer should change status', () => {
//     let todoListID = Object.keys(startState)[0]
//     let taskID = startState[todoListID][0].id
//     let newValue = TaskStatuses.Completed
//     const endState = tasksReducer(startState, changeTaskStatusAC(todoListID, taskID, newValue))
//     expect(endState[todoListID][0].status).toBe(newValue)
// })
// test('tasksReducer should change title of correct task', () => {
//     let todoListID = Object.keys(startState)[0]
//     let taskID = startState[todoListID][0].id
//     let newValue = 'New Item'
//     const endState = tasksReducer(startState, changeTaskTitleAC(todoListID, taskID, newValue))
//     expect(endState[todoListID].find(t => t.id === taskID)?.title).toBe(newValue)
// })
// test('tasksReducer should set tasks', () => {
//     let todoListID = Object.keys(startState)[0]
//     let newValue: ITaskDomain[] = [
//         {
//             id: '1',
//             title: 'React',
//             todoListId: 'todoID1',
//             status: 0,
//             startDate: '',
//             addedDate: '',
//             deadline: '',
//             priority: 0,
//             order: 0,
//             description: '',
//             entityStatus: 'idle'
//         },
//         {
//             id: '2',
//             title: 'Redux',
//             todoListId: 'todoID2',
//             status: 0,
//             startDate: '',
//             addedDate: '',
//             deadline: '',
//             priority: 0,
//             order: 0,
//             description: '',
//             entityStatus: 'idle'
//         }
//     ]
//     const endState = tasksReducer(startState, setTasksAC(todoListID, newValue))
//     expect(endState[todoListID].length).toBe(newValue.length)
//     expect(endState[todoListID][0]).toBe(newValue[0])
// })
// test('tasksReducer should change correct task entity', () => {
//     const newValue: RequestStatusType = 'loading'
//     let todoID = Object.keys(startState)[0]
//     let taskID = startState[todoID][0].id
//
//     const endState = tasksReducer(startState, setTaskEntity(todoID, taskID, newValue))
//     expect(endState[todoID][0].entityStatus).toEqual(newValue)
// })