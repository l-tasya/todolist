import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from './components/TodoList/TodoList';
import {AddItemInput} from './components/TodoList/AddItemInput';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setTodoListAC
} from "./state/todolistReducer";
import {setTasksAC} from "./state/tasksReducer";
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
