import {ResponseType} from '../api/todolists-api'
import {AxiosError} from "axios";
import {appActionsCommon} from "../features/CommonActions/App";

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}
const {setAppStatus, setAppError} = appActionsCommon;
export const handleAsyncServerAppError = <D>(data: ResponseType<D>,
                                             thunkAPI: ThunkAPIType
) => {
    thunkAPI.dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleAsyncServerNetworkError = (error: AxiosError, thunkAPI: ThunkAPIType) => {
    thunkAPI.dispatch(setAppError({error: error.message ? error.message : 'Some error occurred'}))
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))

    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}


