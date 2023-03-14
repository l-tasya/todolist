import {Header} from '../../common/styles/global';
import Paper from '@mui/material/Paper/Paper';
import {AddItem} from '../../components/AddItem/AddItem';
import {TodoList} from './TodoList/TodoList';
import React, {useCallback, useEffect} from 'react';
import {useAppSelector} from '../../common/hooks/hooks';
import styled from 'styled-components';
import {Navigate} from 'react-router-dom';
import {useActions} from '../../utils/redux-utils';
import {todoListActions} from "./index";

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

export const TodoListsList: React.FC<IProps> = React.memo(() => {
        const tasks = useAppSelector(t => t.tasks)
        const todoLists = useAppSelector(t => t.todoList)
        const isLoggedIn = useAppSelector(t => t.auth.isLoggedIn)
        const {fetchTodoListsTC, addTodoListTC} = useActions(todoListActions)
        useEffect(() => {
            if (isLoggedIn) {
                fetchTodoListsTC()
            }
        }, [fetchTodoListsTC,isLoggedIn])


        const addTodoList = useCallback((newValue: string) => {
            addTodoListTC(newValue)
        }, [addTodoListTC])


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