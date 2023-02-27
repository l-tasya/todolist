import React, {useEffect} from 'react';

import {Content, stylesForLoading, Wrapper} from './common/styles/global';
import {NavBar} from './components/NavBar/NavBar';
import {TodoListsLists} from './components/TodoListsLists/TodoListsLists';
import {useAppDispatch, useAppSelector} from './common/hooks/hooks';
import {ErrorSnackbar} from './common/components/ErrorSnackbar/ErrorSnackbar';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {Login} from './components/Login/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import {meTC} from './redux/reducers/auth-reducer';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';


export const App = () => {
    const status = useAppSelector(t => t.app.status)
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(t=>t.auth.isInitialized)
    useEffect(() => {
        dispatch(meTC())
    }, [dispatch])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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
