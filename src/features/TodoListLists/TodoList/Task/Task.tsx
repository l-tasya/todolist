import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {RemoveItem} from '../../../../components/RemoveC/RemoveItem';
import {Container} from './styles';
import {RequestStatusType} from '../../../Application/app-reducer';
import {ITask, TaskStatuses} from '../../../../api/types';
import {tasksActions} from "../../index";
import {useActions} from "../../../../utils/redux-utils";

interface IProps {
    todoID: string
    entity: RequestStatusType
    //task
    task: ITask

}

export const Task: React.FC<IProps> = React.memo(({todoID, task, entity}) => {

        const {removeTaskTC, updateTaskTC} = useActions(tasksActions)

        const changeTaskTitle = useCallback((title: string) => {
            updateTaskTC({
                todoListID: todoID, taskID: task.id, model: {
                    title: title,
                }
            })
        }, [todoID, task.id])
        const changeStatus = useCallback((newValue: TaskStatuses) => {
            updateTaskTC({
                todoListID: todoID, taskID: task.id, model: {
                    status: newValue,
                }
            })
        }, [todoID, task.id])
        const removeTask = useCallback(()=>{
            removeTaskTC({todoListID: todoID, taskID: task.id})
        },[todoID, task.id])
        const suicide = useCallback(() => removeTask(), [removeTask, task.id, todoID])
        const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
        }, [changeStatus, task.id, todoID])
        const changeTitle = useCallback((value: string) => changeTaskTitle(value), [task.id, todoID, changeTaskTitle])

        return <Container>
            <input type={'checkbox'}
                   onChange={onChangeHandler}
                   checked={task.status === TaskStatuses.Completed}
                   disabled={entity === 'loading'}
            />
            <EditableSpan disabled={entity === 'loading'} c1={changeTitle} title={task.title}/>
            <RemoveItem disabled={entity === 'loading'} removeCallback={suicide}/>
        </Container>
    }
)

