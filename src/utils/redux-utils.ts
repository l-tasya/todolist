import {ActionCreatorsMapObject, bindActionCreators} from "@reduxjs/toolkit"
import {useAppDispatch} from "../common/hooks/hooks"
import {useMemo} from "react";


export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [actions, dispatch])
}
