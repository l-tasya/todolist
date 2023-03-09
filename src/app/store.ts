import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from './reducers';

export let store = configureStore({
    reducer: rootReducer,
});
//@ts-ignore
window.store = store