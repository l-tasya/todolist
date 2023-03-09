import {AppRootState} from "./types";


export const loadState = () =>{
    try{
        const serializableState = localStorage.getItem('app-state')
        if(serializableState === null){
            return  undefined
        }
        return JSON.parse(serializableState)
    }
    catch (e) {
        return undefined
    }
}
export const saveState = (state: AppRootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('app-state', serializedState);
    } catch (e) {
        //ignore write errors
    }
}