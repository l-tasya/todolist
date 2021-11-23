import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList/TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    filter: FilterValuesType
    title: string
}

function App() {
    let todoListID1 = v1();
    let todoListID2 = v1();
    //local state
    //todoLists
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'active'},
        {id: todoListID2, title: 'GYM', filter: 'completed'},
    ])
    //todoListsTasks

    let [tasks, setTasks] = useState({
        [todoListID1]: [
            {id: v1(), title: 'reactSN', isDone: true},
            {id: v1(), title: 'Kabzda', isDone: false},
            {id: v1(), title: 'Code Wars', isDone: true},
            {id: v1(), title: 'Todo List', isDone: true},
            {id: v1(), title: 'Home Work', isDone: false},
            {id: v1(), title: 'GYM', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'Legs', isDone: false},
            {id: v1(), title: 'Biceps', isDone: false},
            {id: v1(), title: 'Triceps', isDone: true},
            {id: v1(), title: 'Chest', isDone: true},
        ]
    })

    //callbacks
    const changeStatus = (id: string, currentValue: boolean, todoListsID: string) => {
        let task = tasks[todoListsID].find(t => t.id === id);
        if (task) {
            task.isDone = currentValue
        }
        setTasks({...tasks})
    }
    const removeTask = (removeId: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== removeId)
        setTasks({...tasks})
    }
    const addTasks = (title: string, todoListID:string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }
    const changeFilter = (changeID: string, value: FilterValuesType) => {
        let curr = todoLists.find(t => t.id === changeID);
        if (curr) {
            curr.filter = value;
        }
        setTodoLists([...todoLists])

    }
    const removeTodoList = (removeID: string)=> {
        let result = todoLists.filter(t => t.id !== removeID)
        setTodoLists(result)
    }

    return (
        <div className='app'>
            {
                todoLists.map(t => {
                        let taskForTodoList = tasks[t.id];
                        if (t.filter === 'active') {
                            taskForTodoList = taskForTodoList.filter(t => !t.isDone);
                        }
                        if (t.filter === 'completed') {
                            taskForTodoList = taskForTodoList.filter(t => t.isDone);
                        }

                        return <TodoList key={t.id}/*important*/
                            /*data*/
                                         title={t.title}
                                         id={t.id}
                                         filter={t.filter}
                                         state={taskForTodoList}
                            /*callbacks*/
                                         removeTasks={removeTask}
                                         addTasks={addTasks}
                                         changeFilter={changeFilter}
                                         statusChange={changeStatus}
                                         removeTodoList={removeTodoList}
                        />
                    }
                )
            }

        </div>

    );
}

export default App
