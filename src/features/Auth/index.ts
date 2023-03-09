import {asyncActions, slice} from "./auth-reducer";


const authReducer = slice.reducer
const authActions = {
    ...slice.actions,
    ...asyncActions,
}

export {
    authReducer,
    authActions
}