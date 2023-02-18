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
            {status === 'loading' && <LinearProgress sx={stylesForLoading}/>}
            {status === 'failed' &&
            <LinearProgress variant={'determinate'} value={100} color={'error'} sx={stylesForLoading}/>}
            <TodoListsLists/>
        </Content>
        <ErrorSnackbar/>
    </Wrapper>
}
