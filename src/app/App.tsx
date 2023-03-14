import React, {useEffect} from 'react';

import {Wrapper} from '../common/styles/global';
import {useAppSelector} from '../common/hooks/hooks';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {useActions} from "../utils/redux-utils";
import {appActions} from '../features/Application';


export const App = () => {
    // const status = useAppSelector(t => t.app.status)
    const {initializeAppTC} = useActions(appActions)
    const isInitialized = useAppSelector(t => t.app.isInitialized)
    useEffect(() => {
        initializeAppTC()
    }, [initializeAppTC])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return <Wrapper>
        sss
        {/*<NavBar/>*/}
        {/*<Content>*/}
        {/*    {status === 'loading' && <LinearProgress sx={stylesForLoading}/>}*/}
        {/*    {status === 'failed' &&*/}
        {/*        <LinearProgress variant={'determinate'} value={100} color={'error'} sx={stylesForLoading}/>}*/}
        {/*    <div>{isInitialized}</div>*/}
        {/*    <Routes>*/}
        {/*        <Route path={'/todolist/'} element={<TodoListsList/>}/>*/}
        {/*        <Route path={'/todolist/login'} element={<Login/>}/>*/}
        {/*        <Route path={'/404'} element={<h1>Page Not Found. 404</h1>}/>*/}
        {/*        <Route path={'*'} element={<Navigate to={'/404'}/>}/>*/}
        {/*    </Routes>*/}
        {/*</Content>*/}
        {/*<ErrorSnackbar/>*/}
    </Wrapper>
}
