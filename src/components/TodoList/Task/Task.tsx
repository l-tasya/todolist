import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../common/components/EditableSpan/EditableSpan";
import {RemoveItem} from "../../../common/components/RemoveC/RemoveItem";
import {Container} from "./styles";

interface IProps {
    changeCheckBox: (todoID: string, taskID: string, newValue: boolean) => void
    changeTaskTitle: (todoID: string, taskID: string, value: string) => void
    removeTask: (todoID: string, id: string) => void
    todoID: string
    //task
    id: string
    isDone: boolean
    title: string

}

export const Task: React.FC<IProps> = React.memo(({changeCheckBox, removeTask, changeTaskTitle, id, todoID, isDone, title}) => {
        const suicide = useCallback(() => removeTask(todoID, id), [removeTask, id, todoID])
        const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => changeCheckBox(todoID, id, e.currentTarget.checked), [changeCheckBox, id, todoID])
        const changeTitle = useCallback((value: string) => changeTaskTitle(todoID, id, value), [id, todoID, changeTaskTitle])

        return <Container>
            <input type={"checkbox"}
                   onChange={changeStatus}
                   checked={isDone}
            />
            <EditableSpan c1={changeTitle} title={title}/>
            <RemoveItem removeCallback={suicide}/>
        </Container>
    }
)

