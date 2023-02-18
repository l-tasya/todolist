import {Header} from '../../common/styles/global';
import Paper from '@mui/material/Paper/Paper';
import {AddItem} from '../../common/components/AddItem/AddItem';
import {TodoList} from '../TodoList/TodoList';
import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {
    addTodoListTC,
    fetchTodoListsThunk,
    removeTodoListTC,
    setFilterAC,
    updateTodoListTitleTC
} from '../../redux/reducers/todoListReducer';
import {addTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from '../../redux/reducers/tasksReducer';
import {FilterType, TaskStatuses} from '../../common/types/types';
import styled from 'styled-components';

const Grid = styled.div`
      display: grid;
      grid-gap: 8px;
      grid-template-columns: repeat(auto-fill, minmax(240px, 0.8fr));
      justify-content: center;
      grid-auto-rows: minmax(150px, 250px);
      
`
export const TodoListsLists: React.FC = () => {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(t => t.tasks)
    const todoLists = useAppSelector(t => t.todoList)

    useEffect(() => {
        dispatch(fetchTodoListsThunk())
    }, [dispatch])

    //task
    const removeTask = useCallback((todoListID: string, taskID: string) => {
        const thunk = removeTaskTC(todoListID, taskID);
        dispatch(thunk);
    }, [])
    const changeStatus = useCallback((todoListID: string, taskID: string, status: TaskStatuses) => {
        const thunk = updateTaskStatusTC(todoListID, taskID, status)
        dispatch(thunk)
    }, [])
    const changeTaskTitle = useCallback((todoListID: string, taskID: string, newTitle: string) => {
        const thunk = updateTaskTitleTC(todoListID, taskID, newTitle)
        dispatch(thunk)
    }, [])
    const addTask = useCallback((todoListID: string, newValue: string) => {
        const thunk = addTaskTC(todoListID, newValue)
        dispatch(thunk)
    }, [])

    //todoList
    const setFilter = useCallback((todoListID: string, newValue: FilterType) => {
        const thunk = setFilterAC(todoListID, newValue)
        dispatch(thunk)
    }, [])
    const removeTodoList = useCallback((todoListID: string) => {
        const thunk = removeTodoListTC(todoListID)
        dispatch(thunk)
    }, [])
    const addTodoList = useCallback((newValue: string) => {
        const thunk = addTodoListTC(newValue)
        dispatch(thunk)
    }, [])
    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        const thunk = updateTodoListTitleTC(todoListID, newTitle)
        dispatch(thunk)
    }, [])


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
                    setFilter={setFilter}
                    removeTask={removeTask}
                    removeTodoList={removeTodoList}
                    changeStatus={changeStatus}
                    changeTodoListTitle={changeTodoListTitle}
                    changeTaskTitle={changeTaskTitle}
                    addTask={addTask}
                />)
            }
        </Grid>
    </>
}