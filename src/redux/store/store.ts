import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {todoListReducer} from '../reducers/todoListReducer';
import {tasksReducer} from '../reducers/tasksReducer';
import thunk from 'redux-thunk';
import {appReducer} from '../reducers/app-reducer';
import {authReducer} from '../reducers/auth-reducer';

export type AppStateType = ReturnType<typeof reducers>;

const reducers = combineReducers({
    todoList: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})
//export let store = legacy_createStore(reducers,loadState(), applyMiddleware(thunk)); ---- local storage
export let store = legacy_createStore(reducers, applyMiddleware(thunk));

// store.subscribe(() => {
//     saveState({
//         todoList: store.getState().todoList,
//         tasks: store.getState().tasks,
//         app: store.getState().app,
//         auth: store.getState().auth
//     })
// })
export type StoreType = typeof store;

//@ts-ignore
window.store = store