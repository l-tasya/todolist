import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from '../../../common/components/EditableSpan/EditableSpan';
import {RemoveItem} from '../../../common/components/RemoveC/RemoveItem';
import {Container} from './styles';
import {ITask, TaskStatuses} from '../../../common/types/types';
import {RequestStatusType} from '../../../redux/reducers/app-reducer';

interface IProps {
    changeStatus: (todoID: string, taskID: string, status: TaskStatuses) => void
    changeTaskTitle: (todoID: string, taskID: string, value: string) => void
    removeTask: (todoID: string, id: string) => void
    todoID: string
    entity: RequestStatusType
    //task
    task: ITask

}

export const Task: React.FC<IProps> = React.memo(({changeStatus, removeTask, changeTaskTitle, todoID, task, entity}) => {
        const suicide = useCallback(() => removeTask(todoID, task.id), [removeTask, task.id, todoID])
        const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(todoID, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
        }, [changeStatus, task.id, todoID])
        const changeTitle = useCallback((value: string) => changeTaskTitle(todoID, task.id, value), [task.id, todoID, changeTaskTitle])

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

