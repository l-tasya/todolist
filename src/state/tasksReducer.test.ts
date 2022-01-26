import {v1} from 'uuid';
import {TasksType, TodoListType} from '../App';
import {AddTaskAC, ChangeTaskCheckboxAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from './tasksReducer';
import {AddTodoListAC, RemoveTodoListAC} from "./todolistReducer";

test('tasks reducer should remove correct task', ()=>{
    let todoListID1 = v1();
    let todoListID2 = v1();
    let todoLists: TodoListType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'Sunday tasks', filter: 'all'},
    ]
    const startState: TasksType = {
        [todoLists[0].id]: [
            {id: v1(), taskTitle: 'reactSN', isDone: true},
            {id: v1(), taskTitle: 'Kabzda', isDone: false},
            {id: v1(), taskTitle: 'Code Wars', isDone: true},
            {id: v1(), taskTitle: 'Todo List', isDone: true},
            {id: v1(), taskTitle: 'Home Work', isDone: false},
            {id: v1(), taskTitle: 'Counter', isDone: false},
            {id: v1(), taskTitle: 'Local Storage', isDone: false},
        ],
        [todoLists[1].id]: [
            {id: v1(), taskTitle: 'Iron a Shirt', isDone: false},
            {id: v1(), taskTitle: 'Collect the bag', isDone: false},
            {id: v1(), taskTitle: 'Prepare clothes for next day', isDone: false},
            {id: v1(), taskTitle: 'Contain dinner for the next day', isDone: false},
            {id: v1(), taskTitle: 'do homework', isDone: false},
            {id: v1(), taskTitle: 'set alarm', isDone: false},
        ]
    }
    let removeTodoListID = todoListID1
    let removeTaskID = startState[removeTodoListID][3].id
    const endState = tasksReducer(startState, RemoveTaskAC(removeTaskID, removeTodoListID))
    expect(endState[todoListID1].length).toBe(6)
    expect(endState[todoListID1][3].taskTitle).toBe('Home Work')
})
test('task reducer should add task for correct todolist', ()=>{
    let todoListID1 = v1();
    let todoListID2 = v1();
    let todoLists: TodoListType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'Sunday tasks', filter: 'all'},
    ]
    const startState: TasksType = {
        [todoLists[0].id]: [
            {id: v1(), taskTitle: 'reactSN', isDone: true},
            {id: v1(), taskTitle: 'Kabzda', isDone: false},
            {id: v1(), taskTitle: 'Code Wars', isDone: true},
            {id: v1(), taskTitle: 'Todo List', isDone: true},
            {id: v1(), taskTitle: 'Home Work', isDone: false},
            {id: v1(), taskTitle: 'Counter', isDone: false},
            {id: v1(), taskTitle: 'Local Storage', isDone: false},
        ],
        [todoLists[1].id]: [
            {id: v1(), taskTitle: 'Iron a Shirt', isDone: false},
            {id: v1(), taskTitle: 'Collect the bag', isDone: false},
            {id: v1(), taskTitle: 'Prepare clothes for next day', isDone: false},
            {id: v1(), taskTitle: 'Contain dinner for the next day', isDone: false},
            {id: v1(), taskTitle: 'do homework', isDone: false},
            {id: v1(), taskTitle: 'set alarm', isDone: false},
        ]
    }
    let newTaskTitle = 'New task'
    let todoListID = todoListID1
    const endState = tasksReducer(startState, AddTaskAC(newTaskTitle, todoListID))
    expect(endState[todoListID].length).toBe(8)
    expect(endState[todoListID][0].taskTitle).toBe(newTaskTitle)


})
test('task reducer should change task checkbox for correct todoList',()=>{
    let todoListID1 = v1();
    let todoListID2 = v1();
    let todoLists: TodoListType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'Sunday tasks', filter: 'all'},
    ]
    const startState: TasksType = {
        [todoLists[0].id]: [
            {id: v1(), taskTitle: 'reactSN', isDone: true},
            {id: v1(), taskTitle: 'Kabzda', isDone: false},
            {id: v1(), taskTitle: 'Code Wars', isDone: true},
            {id: v1(), taskTitle: 'Todo List', isDone: true},
            {id: v1(), taskTitle: 'Home Work', isDone: false},
            {id: v1(), taskTitle: 'Counter', isDone: false},
            {id: v1(), taskTitle: 'Local Storage', isDone: false},
        ],
        [todoLists[1].id]: [
            {id: v1(), taskTitle: 'Iron a Shirt', isDone: false},
            {id: v1(), taskTitle: 'Collect the bag', isDone: false},
            {id: v1(), taskTitle: 'Prepare clothes for next day', isDone: false},
            {id: v1(), taskTitle: 'Contain dinner for the next day', isDone: false},
            {id: v1(), taskTitle: 'do homework', isDone: false},
            {id: v1(), taskTitle: 'set alarm', isDone: false},
        ]
    }
    let todoListID = todoListID1
    let taskID = startState[todoListID1][3].id
    let changedValue = !startState[todoListID1][3].isDone
    let endState = tasksReducer(startState, ChangeTaskCheckboxAC(taskID,changedValue,todoListID))
    expect(endState[todoListID1][3].isDone).toBe(changedValue)
})
test('task reducer should change task title for correct todoList', ()=>{
    let todoListID1 = v1();
    let todoListID2 = v1();
    let todoLists: TodoListType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'Sunday tasks', filter: 'all'},
    ]
    const startState: TasksType = {
        [todoLists[0].id]: [
            {id: v1(), taskTitle: 'reactSN', isDone: true},
            {id: v1(), taskTitle: 'Kabzda', isDone: false},
            {id: v1(), taskTitle: 'Code Wars', isDone: true},
            {id: v1(), taskTitle: 'Todo List', isDone: true},
            {id: v1(), taskTitle: 'Home Work', isDone: false},
            {id: v1(), taskTitle: 'Counter', isDone: false},
            {id: v1(), taskTitle: 'Local Storage', isDone: false},
        ],
        [todoLists[1].id]: [
            {id: v1(), taskTitle: 'Iron a Shirt', isDone: false},
            {id: v1(), taskTitle: 'Collect the bag', isDone: false},
            {id: v1(), taskTitle: 'Prepare clothes for next day', isDone: false},
            {id: v1(), taskTitle: 'Contain dinner for the next day', isDone: false},
            {id: v1(), taskTitle: 'do homework', isDone: false},
            {id: v1(), taskTitle: 'set alarm', isDone: false},
        ]
    }
    let todoListID = todoListID1
    let taskID = startState[todoListID1][3].id
    let newTitle = 'new Title'

    const endState = tasksReducer(startState, ChangeTaskTitleAC(taskID, newTitle,todoListID))
    expect(endState[todoListID1][3].taskTitle).toBe(newTitle)
})
test('new array of the tasks should be added when todolist is added', ()=> {
    const startState: TasksType = {
        ["todoLists1"]: [
            {id: v1(), taskTitle: 'reactSN', isDone: true},
            {id: v1(), taskTitle: 'Kabzda', isDone: false},
            {id: v1(), taskTitle: 'Code Wars', isDone: true},
            {id: v1(), taskTitle: 'Todo List', isDone: true},
        ],
        ["todoLists2"]: [
            {id: v1(), taskTitle: 'b', isDone: true},
            {id: v1(), taskTitle: 'a', isDone: false},
            {id: v1(), taskTitle: 'b', isDone: false},
        ],
    }
    const action = AddTodoListAC('title no matter')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(t=> t != "todoLists1" && t != "todoLists2" )
    if(!newKey){
        throw new Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('array of the tasks should be removed when todolist is removed', ()=> {
    const startState: TasksType = {
        ["todoLists1"]: [
            {id: v1(), taskTitle: 'reactSN', isDone: true},
            {id: v1(), taskTitle: 'Kabzda', isDone: false},
            {id: v1(), taskTitle: 'Code Wars', isDone: true},
            {id: v1(), taskTitle: 'Todo List', isDone: true},
        ],
        ["todoLists2"]: [
            {id: v1(), taskTitle: 'b', isDone: true},
            {id: v1(), taskTitle: 'a', isDone: false},
            {id: v1(), taskTitle: 'b', isDone: false},
        ],
    }
    const action = RemoveTodoListAC("todoLists2")
    const endState = tasksReducer(startState, action)

    let keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState["todoLists2"]).toBeUndefined()
})
