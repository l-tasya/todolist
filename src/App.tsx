import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList/TodoList';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskType = {
    id: string
    taskTitle: string
    isDone: boolean
}

function App() {
    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'active'},
        {id: todoListID2, title: 'GYM', filter: 'completed'},
    ])
    let [tasks, setTasks] = useState({
        [todoListID1]: [
            {id: v1(), taskTitle: 'reactSN', isDone: true},
            {id: v1(), taskTitle: 'Kabzda', isDone: false},
            {id: v1(), taskTitle: 'Code Wars', isDone: true},
            {id: v1(), taskTitle: 'Todo List', isDone: true},
            {id: v1(), taskTitle: 'Home Work', isDone: false},
            {id: v1(), taskTitle: 'GYM', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), taskTitle: 'Legs', isDone: false},
            {id: v1(), taskTitle: 'Biceps', isDone: false},
            {id: v1(), taskTitle: 'Triceps', isDone: true},
            {id: v1(), taskTitle: 'Chest', isDone: true},
        ]
    })

    //callbacks
    const changeCheckBoxValue = (id: string, changedValue: boolean, todoListsID: string) => {
        let task = tasks[todoListsID].find(t => t.id === id);
        if (task) {task.isDone = changedValue}
        setTasks({...tasks})
    }
    const removeTask = (removeId: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== removeId)
        setTasks({...tasks})
    }
    const addTasks = (newTitle: string, todoListID: string) => {
        let newTask = {id: v1(), taskTitle: newTitle, isDone: false}
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }
    const changeFilter = (todoListID: string, value: FilterType) => {
        let curr = todoLists.find(t => t.id === todoListID);
        if (curr) {
            curr.filter = value;
        }
        setTodoLists([...todoLists])

    }
    const removeTodoList = (todoListID: string) => {
        let result = todoLists.filter(t => t.id !== todoListID)
        setTodoLists(result)
    }

    return (
        <div className='app'>
            {
                todoLists.map(t => {
                        //for all filter
                        let taskForTodoList = tasks[t.id];
                        //for active filter
                        if (t.filter === 'active') {
                            taskForTodoList = taskForTodoList.filter(t => !t.isDone);
                        }
                        //for completed filter
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
                            statusChange={changeCheckBoxValue}
                            removeTodoList={removeTodoList}
                        />
                    }
                )
            }

        </div>

    );
}

export default App
