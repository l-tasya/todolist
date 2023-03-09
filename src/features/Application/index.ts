import {asyncActions, slice} from "./app-reducer";

const appReducer = slice.reducer
const appActions = {
    ...slice.actions,
    ...asyncActions
}


export {
    appReducer,
    appActions
}