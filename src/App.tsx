import React, {useState} from "react";
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";


//filter
export type FilterType = "All" | "Completed" | "Active"
//todoLists
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TodoListsType = TodoListType[]
//tasks
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = TaskType[]
export type AllTasksType = {
    [key: string]: TasksType,
}
export const todoList1 = v1()
export const todoList2 = v1()
export const App = () => {

    const [tasks, setTasks] = useState<AllTasksType>({
        [todoList1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Promises", isDone: true},
            {id: v1(), title: "Thunk", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
        ],
        [todoList2]: [
            {id: v1(), title: "Metro", isDone: false},
            {id: v1(), title: "Death Stranding", isDone: true},
        ]
    })
    const [todoLists, setTodoLists] = useState<TodoListsType>([
        {id: todoList1, title: "What to Learn", filter: "All"},
        {id: todoList2, title: "What to Play", filter: "Completed"},
    ])
    //callbacks
    const setFilter = (todoListID: string, newValue: FilterType) => {
        let todoList = todoLists.find(t=>t.id === todoListID)
        if(todoList){
            todoList.filter = newValue
        }
        setTodoLists([...todoLists])
    }
    const removeTask = (todoListID: string, taskID: string) =>{
        tasks[todoListID] = tasks[todoListID].filter(t=>t.id !==taskID)
        setTasks({...tasks})
    }
    const removeTodoList = (todoListID: string) =>{
        let todoList = todoLists.filter(t=>t.id !== todoListID)
        delete tasks[todoListID]
        setTodoLists([...todoList])
    }
    const changeCheckBox = (todoListID: string, taskID: string, newValue: boolean) =>{
        let items = tasks[todoListID]
        let task = items.find(t=>t.id === taskID)
        if(task){
            task.isDone = newValue
        }
        setTasks({...tasks})
    }





    return <div>
        {
            todoLists.map(t=>{
                let resultTasks = tasks[t.id];
                if(t.filter === 'Active'){
                    resultTasks = tasks[t.id].filter(t=>!t.isDone)
                }
                if(t.filter === 'Completed'){
                    resultTasks =tasks[t.id].filter(t=>t.isDone)
                }
                return <TodoList
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    tasks={resultTasks}
                    setFilter={setFilter}
                    removeTask={removeTask}
                    removeTodoList={removeTodoList}
                    changeCheckBox={changeCheckBox}
                />
            })
        }
    </div>
}
