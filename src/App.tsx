import React from 'react';

import {Content, stylesForLoading, Wrapper} from './common/styles/global';
import {NavBar} from './components/NavBar/NavBar';
import {TodoListsLists} from './components/TodoListsLists/TodoListsLists';
import {useAppSelector} from './common/hooks/hooks';
import {LinearProgress} from '@mui/material';
import {ErrorSnackbar} from './common/components/ErrorSnackbar/ErrorSnackbar';


export const App = () => {
    const status = useAppSelector(t => t.app.status)
    return <Wrapper>
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
}
