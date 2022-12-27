import React from "react";
import {TodoList} from "./components/TodoList/TodoList";
import {
    addTaskAC,
    AllTasksType,
    changeCheckBoxAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./redux/reducers/tasksReducer";
import {
    addTodoListAC,
    changeTodoListTitleAC,
    FilterType,
    removeTodoListAC,
    setFilterAC,
    TodoListsType
} from "./redux/reducers/todoListReducer";
import {AppStateType} from "./redux/store/store";
import {useDispatch, useSelector} from "react-redux";
import {AddItem} from "./common/components/AddItem/AddItem";


export const App = React.memo(() => {
    console.log('App is called')
    //TODO: stylize all appk
    const tasks = useSelector<AppStateType, AllTasksType>(t => t.tasks)
    const todoLists = useSelector<AppStateType, TodoListsType>(t => t.todoList)
    const dispatch = useDispatch()

    const setFilter = (todoListID: string, newValue: FilterType) => {
        dispatch(setFilterAC(todoListID, newValue))
    }
    const removeTask = (todoListID: string, taskID: string) => {
        dispatch(removeTaskAC(todoListID, taskID))
    }
    const removeTodoList = (todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }
    const changeCheckBox = (todoListID: string, taskID: string, newValue: boolean) => {
        dispatch(changeCheckBoxAC(todoListID, taskID, newValue))
    }
    const changeTodoListTitle = (todoListID: string, newTitle: string) =>{
        dispatch(changeTodoListTitleAC(todoListID, newTitle))
    }
    const changeTaskTitle = (todoListID: string,taskID: string, newTitle: string) =>{
        dispatch(changeTaskTitleAC(todoListID,taskID, newTitle))
    }
    const addTask = (todoListID: string, newValue: string) =>{
        dispatch(addTaskAC(todoListID, newValue))
    }
    const addTodoList = (newValue: string) =>{
        dispatch(addTodoListAC(newValue))
    }

    return <div>
        <AddItem addItem={addTodoList}/>
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
                    removeTask={removeTask}
                    removeTodoList={removeTodoList}
                    changeCheckBox={changeCheckBox}
                    changeTodoListTitle={changeTodoListTitle}
                    changeTaskTitle={changeTaskTitle}
                    addTask={addTask}
                />
            })
        }
    </div>
})
