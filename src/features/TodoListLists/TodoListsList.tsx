import {Header} from '../../common/styles/global';
import Paper from '@mui/material/Paper/Paper';
import {AddItem} from '../../components/AddItem/AddItem';
import {TodoList} from './TodoList/TodoList';
import React, {useCallback, useEffect} from 'react';
import {useAppSelector} from '../../common/hooks/hooks';
import styled from 'styled-components';
import {Navigate} from 'react-router-dom';
import {useActions} from '../../utils/redux-utils';
import {tasksActions, todoListActions} from "./index";

const Grid = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 0.8fr));
  justify-content: center;
  grid-auto-rows: minmax(150px, 250px);

`

interface IProps {
    demo?: boolean
}

export const TodoListsList: React.FC<IProps> = React.memo(({}) => {
        const tasks = useAppSelector(t => t.tasks)
        const todoLists = useAppSelector(t => t.todoList)
        const isLoggedIn = useAppSelector(t => t.auth.isLoggedIn)
        const {fetchTodoListsTC, addTodoListTC} = useActions(todoListActions)
        useEffect(() => {
            if (isLoggedIn) {
                fetchTodoListsTC()
            }
        }, [fetchTodoListsTC])


        //task
        // const removeTask = useCallback((todoListID: string, taskID: string) => {
        //     removeTaskTC({todoListID, taskID});
        // }, [])
        // const changeStatus = useCallback((todoListID: string, taskID: string, status: TaskStatuses) => {
        //     updateTaskTC({todoListID, taskID, model: {status: status}})
        // }, [])
        // const changeTaskTitle = useCallback((todoListID: string, taskID: string, newTitle: string) => {
        //     updateTaskTC({todoListID, taskID, model: {title: newTitle,}})
        // }, [])
        // const addTask = useCallback((todoListID: string, newValue: string) => {
        //     addTaskTC({todoListID, title: newValue})
        // }, [])

        //todoList
        // const setFilter = useCallback((todoListID: string, newValue: FilterType) => {
        //     changeTodolistFilter({id: todoListID, filter: newValue})
        // }, [])
        // const removeTodoList = useCallback((todoListID: string) => {
        //     removeTodoListTC(todoListID)
        //
        // }, [])
        // const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        //     changeTodoListTitleTC({todoListID, title: newTitle})
        //
        // }, [])
        const addTodoList = useCallback((newValue: string) => {
            addTodoListTC(newValue)
        }, [])


        if (!isLoggedIn) {
            return <Navigate to={'/todolist/login'}/>
        }
        return <>
            <Header>
                <Paper className="add-container">
                    <AddItem addItem={addTodoList}/>
                </Paper>
            </Header>
            <Grid>
                {
                    todoLists.map(t => <TodoList
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        filter={t.filter}
                        tasks={tasks[t.id]}
                        entityStatus={t.entityStatus}
                    />)
                }
            </Grid>
        </>
    }
)