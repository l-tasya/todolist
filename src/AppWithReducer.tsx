import React, {useEffect, useReducer} from 'react';
import './App.css';
import {TodoList} from './components/TodoList/TodoList';
import {v1} from 'uuid';
import {AddItemInput} from './components/TodoList/AddItemInput';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    SetTodoListAC,
    todolistReducer
} from "./state/todolistReducer";
import {
    AddTaskAC,
    ChangeTaskCheckboxAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    SetTasksAC,
    tasksReducer
} from "./state/tasksReducer";

export type FilterType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskItemType = {
    id: string
    taskTitle: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: Array<TaskItemType>
}

function AppWithReducer() {
    /*------local state level------*/
    let initialStateForTodoList: TodoListType[] = [
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'Sunday tasks', filter: 'all'},
    ]

    let [todoLists, dispatchToTodoLists] = useReducer(todolistReducer, initialStateForTodoList)

    let initialStateForTasks: TasksType = {
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
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, initialStateForTasks)

    /*------local state level------*/


    /**/
    useEffect(() => {
        getTodoListsFromLocalStorage()
        getTasksFromLocalStorage()
    }, [])
    const getTodoListsFromLocalStorage = () => {
        let newValue = localStorage.getItem('todoLists')

        if (newValue) {
            dispatchToTodoLists(SetTodoListAC(JSON.parse(newValue)))
        }
    }
    const getTasksFromLocalStorage = () => {
        let newValue = localStorage.getItem('todoListsTasks')

        if (newValue) {
            dispatchToTasks(SetTasksAC(JSON.parse(newValue)))
        }
    }

    useEffect(() => {
        localStorage.setItem('todoLists', JSON.stringify(todoLists))

    }, [todoLists])
    useEffect(() => {
        localStorage.setItem('todoListsTasks', JSON.stringify(tasks))
    }, [tasks])
    /**/


    /*------ callbacks ------*/
    const changeFilter = (filterNew: FilterType, todoListID: string) => {
        dispatchToTodoLists(ChangeTodoListFilterAC(filterNew,todoListID))
    }
    const changeTaskCheckbox = (taskID: string, changedValue: boolean, todoListsID: string) => {
        dispatchToTasks(ChangeTaskCheckboxAC(taskID, changedValue, todoListsID))
    }
    const changeTaskTitle = (taskID: string, changedValue: string, todoListsID: string) => {
        dispatchToTasks(ChangeTaskTitleAC(taskID, changedValue, todoListsID))
    }
    const removeTask = (taskID: string, todoListID: string) => {
        dispatchToTasks(RemoveTaskAC(taskID, todoListID))
    }
    const addTasks = (newTaskTitle: string, todoListID: string) => {
        dispatchToTasks(AddTaskAC(newTaskTitle, todoListID))
    }

    const changeTodoListTitle = (newTitle: string, todoListsID: string) => {
        dispatchToTodoLists(ChangeTodoListTitleAC(newTitle, todoListsID))
    }
    const removeTodoList = (todoListID: string) => {
        dispatchToTodoLists(RemoveTodoListAC(todoListID))
        dispatchToTasks(RemoveTodoListAC(todoListID))
    }
    const addTodoList = (title: string) => {
        let action = AddTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    /*------ callbacks ------*/

    return (
        <div className='app'>
            <AddItemInput addTasks={addTodoList}/>
            {
                todoLists.map(t => {
                        let taskForTodoList = tasks[t.id];
                        if (t.filter === 'active') {
                            taskForTodoList = taskForTodoList.filter(t => !t.isDone);
                        }
                        if (t.filter === 'completed') {
                            taskForTodoList = taskForTodoList.filter(t => t.isDone);
                        }
                        return <TodoList
                            /*data*/
                            key={t.id}
                            title={t.title}
                            id={t.id}
                            filter={t.filter}
                            tasks={taskForTodoList}
                            /*callbacks*/
                            removeTasks={removeTask}
                            addTasks={addTasks}
                            changeFilter={changeFilter}
                            changeTaskCheckbox={changeTaskCheckbox}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    }
                )
            }

        </div>

    );
}

export default AppWithReducer
