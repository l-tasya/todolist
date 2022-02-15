import React, {useEffect, useReducer} from 'react';
import './App.css';
import {TodoList} from './components/TodoList/TodoList';
import {v1} from 'uuid';
import {AddItemInput} from './components/TodoList/AddItemInput';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setTodoListAC,
    todolistReducer
} from "./state/todolistReducer";
import {
    addTaskAC,
    changeTaskCheckboxAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/store";

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

function AppWithRedux() {
    const dispatch = useDispatch()
    let todoLists = useSelector<AppStateType, TodoListType[]>((state)=>state.todoList)
    let tasks = useSelector<AppStateType, TasksType>((state)=>state.tasks)
    /*------local state level------*/


    /**/
    useEffect(() => {
        getTodoListsFromLocalStorage()
        getTasksFromLocalStorage()
    }, [])
    const getTodoListsFromLocalStorage = () => {
        let newValue = localStorage.getItem('todoLists')

        if (newValue) {
            dispatch(setTodoListAC(JSON.parse(newValue)))
        }
    }
    const getTasksFromLocalStorage = () => {
        let newValue = localStorage.getItem('todoListsTasks')

        if (newValue) {
            dispatch(setTasksAC(JSON.parse(newValue)))
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
        dispatch(changeTodoListFilterAC(filterNew,todoListID))
    }
    const changeTaskCheckbox = (taskID: string, changedValue: boolean, todoListsID: string) => {
        dispatch(changeTaskCheckboxAC(taskID, changedValue, todoListsID))
    }
    const changeTaskTitle = (taskID: string, changedValue: string, todoListsID: string) => {
        dispatch(changeTaskTitleAC(taskID, changedValue, todoListsID))
    }
    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }
    const addTasks = (newTaskTitle: string, todoListID: string) => {
        dispatch(addTaskAC(newTaskTitle, todoListID))
    }

    const changeTodoListTitle = (newTitle: string, todoListsID: string) => {
        dispatch(changeTodoListTitleAC(newTitle, todoListsID))
    }
    const removeTodoList = (todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }
    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }
    /*------ callbacks ------*/

    return (
        <div className='app'>
            <AddItemInput addTasks={addTodoList}/>
            {
                todoLists.map(t => {
                        return <TodoList
                            /*data*/
                            key={t.id}
                            title={t.title}
                            id={t.id}
                            filter={t.filter}
                            /*callbacks*/
                            changeFilter={changeFilter}
                            removeTodoList={removeTodoList}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    }
                )
            }

        </div>

    );
}

export default AppWithRedux
