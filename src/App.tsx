import React, {useCallback, useEffect} from "react";
import {TodoList} from "./components/TodoList/TodoList";
import {addTaskAC, changeCheckBoxAC, changeTaskTitleAC, removeTaskAC} from "./redux/reducers/tasksReducer";
import {
    addTodoListAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setFilterAC,
    setTodoListsTC,
} from "./redux/reducers/todoListReducer";
import {useAppDispatch, AppStateType} from "./redux/store/store";
import {useSelector} from "react-redux";
import {AddItem} from "./common/components/AddItem/AddItem";
import styled from "styled-components";
import {AppBox, Content, Header} from "./common/styles/global";
import {NavBar} from "./components/NavBar/NavBar";
import {FilterType, ITodoListDomain, TasksReducerType} from "./common/types/types";

const TodoContainer = styled.div`
      margin: 0 16px 16px 8px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 0.8fr));
      justify-content: center;
      grid-auto-rows: minmax(200px, 350px);
      
`
export const App = React.memo(() => {
    console.log("App is called")
    const tasks = useSelector<AppStateType, TasksReducerType>(t => t.tasks)
    const todoLists = useSelector<AppStateType, ITodoListDomain[]>(t => t.todoList)
    const dispatch = useAppDispatch()

    //task
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


    useEffect(() => {
        dispatch(setTodoListsTC)
    }, [])

    return <AppBox>
        <NavBar/>
        <Content>
            <Header>
                <AddItem addItem={addTodoList}/>
            </Header>
            <TodoContainer>
                {
                    todoLists.map(t => <TodoList
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
                    />)
                }
            </TodoContainer>
        </Content>
    </AppBox>
})
