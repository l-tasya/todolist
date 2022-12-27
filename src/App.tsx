import React from "react";
import {TodoList} from "./components/TodoList/TodoList";
import {AllTasksType} from "./redux/reducers/tasksReducer";
import {changeFilterAC, FilterType, TodoListsType} from "./redux/reducers/todoListReducer";
import {AppStateType} from "./redux/store/store";
import {useDispatch, useSelector} from "react-redux";


export const App = () => {
    const tasks = useSelector<AppStateType, AllTasksType>(t => t.tasks)
    const todoLists = useSelector<AppStateType, TodoListsType>(t => t.todoList)
    const dispatch = useDispatch()

    // const [todoLists, setTodoLists] = useState<TodoListsType>([
    //     {id: todoList1, title: "What to Learn", filter: "All"},
    //     {id: todoList2, title: "What to Play", filter: "Completed"},
    // ])
    // //callbacks
    const setFilter = (todoListID: string, newValue: FilterType) => {
        dispatch(changeFilterAC(todoListID, newValue))
    }
    // const removeTask = (todoListID: string, taskID: string) =>{
    //     tasks[todoListID] = tasks[todoListID].filter(t=>t.id !==taskID)
    //     setTasks({...tasks})
    // }
    // const removeTodoList = (todoListID: string) =>{
    //     let todoList = todoLists.filter(t=>t.id !== todoListID)
    //     delete tasks[todoListID]
    //     setTodoLists([...todoList])
    // }
    // const changeCheckBox = (todoListID: string, taskID: string, newValue: boolean) =>{
    //     let items = tasks[todoListID]
    //     let task = items.find(t=>t.id === taskID)
    //     if(task){
    //         task.isDone = newValue
    //     }
    //     setTasks({...tasks})
    // }
    //
    //
    //


    return <div>
        {
            todoLists.map(t => {
                let resultTasks = tasks[t.id];
                if (t.filter === "Active") {
                    resultTasks = tasks[t.id].filter(t => !t.isDone)
                }
                if (t.filter === "Completed") {
                    resultTasks = tasks[t.id].filter(t => t.isDone)
                }
                return <TodoList
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    tasks={resultTasks}
                    setFilter={setFilter}
                    removeTask={() => {
                    }}
                    removeTodoList={() => {
                    }}
                    changeCheckBox={() => {
                    }}
                />
            })
        }
    </div>
}
