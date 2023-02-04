import React, {useCallback, useEffect, useState} from "react";
import {TodoList} from "./components/TodoList/TodoList";
import {addTaskAC, changeCheckBoxAC, changeTaskTitleAC, removeTaskAC} from "./redux/reducers/tasksReducer";
import {
    addTodoListAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setFilterAC,
    setTodoListsTC,
} from "./redux/reducers/todoListReducer";
import {AppStateType, useAppDispatch} from "./redux/store/store";
import {useSelector} from "react-redux";
import {AddItem} from "./common/components/AddItem/AddItem";
import styled from "styled-components";
import {Content, Header, Wrapper} from "./common/styles/global";
import {NavBar} from "./components/NavBar/NavBar";
import {FilterType, ITodoListDomain, TasksReducerType} from "./common/types/types";
import {Paper} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
const TodoContainer = styled.div`
      display: grid;
      grid-gap: 8px;
      grid-template-columns: repeat(auto-fill, minmax(300px, 0.8fr));
      justify-content: center;
      grid-auto-rows: minmax(200px, 300px);
      
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
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        dispatch(setTodoListsTC)
    }, [dispatch])

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    setLoading(false)
                }
                let diff = Math.random() * 550;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return loading?<LinearProgress variant="determinate" value={progress} />:<Wrapper>
        <NavBar/>
        <Content>
            <Header>
                <Paper className="add-container">
                    <AddItem addItem={addTodoList}/>
                </Paper>
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
    </Wrapper>
})
