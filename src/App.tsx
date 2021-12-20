import React, {useEffect, useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList/TodoList';
import {v1} from 'uuid';
import {AddItemInput} from './components/TodoList/AddItemInput';

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

function App() {
    /*------local state level------*/
    let todoListID1 = v1();
    let todoListID2 = v1();
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'Sunday tasks', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
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
    })
    /*------local state level------*/
    /**/
    useEffect(()=>{
        getTodoListsFromLocalStorage()
        getTasksFromLocalStorage()
    }, [])
    const getTodoListsFromLocalStorage = ()=>{
        let newValue = localStorage.getItem('todoLists')

        if( newValue ){
            setTodoLists(JSON.parse(newValue))
        }
    }
    const getTasksFromLocalStorage = () =>{
        let newValue = localStorage.getItem('todoListsTasks')

        if( newValue ){
            setTasks(JSON.parse(newValue))
        }
    }

    useEffect(()=>{
        localStorage.setItem('todoLists', JSON.stringify(todoLists))

    }, [todoLists])
    useEffect(()=>{
        localStorage.setItem('todoListsTasks', JSON.stringify(tasks))
    }, [tasks])
    /**/



    /*------ callbacks ------*/
    const changeFilter = (filterNew: FilterType, todoListID: string) => {
        let curr = todoLists.find(t => t.id === todoListID);
        if (curr) {
            curr.filter = filterNew;
        }
        setTodoLists([...todoLists])

    }
    const changeTaskCheckbox = (taskID: string, changedValue: boolean, todoListsID: string) => {
        let task = tasks[todoListsID].find(t => t.id === taskID);
        if (task) {task.isDone = changedValue}
        setTasks({...tasks})
    }
    const changeTaskTitle = (taskID: string, changedValue: string, todoListsID: string) =>{
        let task = tasks[todoListsID].find(t=>t.id === taskID)
        if(task){
            task.taskTitle = `${changedValue}`
            task.isDone = false
        }
        setTasks({...tasks})
    }
    const removeTask = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTasks = (newTaskTitle: string, todoListID: string) => {
        let newTask = {id: v1(), taskTitle: newTaskTitle, isDone: false}
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }
    const changeTodoListTitle = (newTitle: string, todoListsID: string) =>{
        let todoList = todoLists.find( t=> t.id === todoListsID)
        if(todoList){todoList.title = `${newTitle}`}
        setTodoLists([...todoLists])
    }
    const removeTodoList = (todoListID: string) => {
        let result = todoLists.filter(t => t.id !== todoListID)
        setTodoLists(result)
    }
    const addTodoList = (title: string) => {
        let temp: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([temp, ...todoLists])
        setTasks({...tasks, [temp.id]:[]})
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

export default App
