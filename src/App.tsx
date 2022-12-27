import React, {useCallback} from "react";
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


    const removeTask = useCallback((todoListID: string, taskID: string) => {
        dispatch(removeTaskAC(todoListID, taskID))
    }, [dispatch])

    const changeCheckBox = useCallback((todoListID: string, taskID: string, newValue: boolean) => {
        dispatch(changeCheckBoxAC(todoListID, taskID, newValue))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListID: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListID, taskID, newTitle))
    }, [dispatch])
    const addTask = useCallback((todoListID: string, newValue: string) => {
        dispatch(addTaskAC(todoListID, newValue))
    }, [dispatch])

    //todoList
    const setFilter = useCallback((todoListID: string, newValue: FilterType) => {
        dispatch(setFilterAC(todoListID, newValue))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }, [dispatch])
    const addTodoList = useCallback((newValue: string) => {
        dispatch(addTodoListAC(newValue))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListID, newTitle))
    }, [dispatch])


    return <div>
        <AddItem addItem={addTodoList}/>
        {
            todoLists.map(t => {
                return <TodoList

                    key={t.id}
                    id={t.id}
                    title={t.title}
                    filter={t.filter}

                    tasks={tasks[t.id]}

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
