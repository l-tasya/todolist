import React, {useCallback, useEffect} from 'react';
import {AddItem} from '../../../components/AddItem/AddItem';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {RemoveItem} from '../../../components/RemoveC/RemoveItem';
import {Container, Footer, Header, List} from './styles';
import {Task} from './Task/Task';
import ToggleButton from '@mui/material/ToggleButton/ToggleButton';
import {RequestStatusType} from '../../Application/app-reducer';
import {ITaskDomain} from '../../../common/types/types';
import {FilterType, TaskStatuses} from '../../../api/types';
import {useActions} from "../../../utils/redux-utils";
import {tasksActions, todoListActions} from "../index";

interface IProps {
    id: string
    title: string
    tasks: ITaskDomain[]
    filter: FilterType
    entityStatus: RequestStatusType
}

export const TodoList: React.FC<IProps> = React.memo<IProps>(({
                                                                  title,
                                                                  filter,
                                                                  tasks,
                                                                  id,
                                                                  entityStatus
                                                              }) => {
        const {fetchTasksTC, addTaskTC} = useActions(tasksActions)
        const {changeTodolistFilter, removeTodoListTC, changeTodoListTitleTC} = useActions(todoListActions)
        useEffect(() => {
            fetchTasksTC(id)
        }, [id, fetchTasksTC])

        const addTaskCallback = useCallback((title: string) => addTaskTC({todoListID: id, title: title}), [id, addTaskTC])
        const changeTodoListTitleCallback = useCallback((newValue: string) => {
            changeTodoListTitleTC({todoListID: id, title: newValue})
        }, [changeTodoListTitleTC, id])
        const removeTodoListCallback = useCallback(() => {
            removeTodoListTC(id)
        }, [id, removeTodoListTC])
        //filter

        let resultTasks = tasks;
        if (filter === 'Active') {
            resultTasks = tasks.filter(t => t.status === TaskStatuses.New)
        }
        if (filter === 'Completed') {
            resultTasks = tasks.filter(t => t.status === TaskStatuses.Completed)
        }

        const changeFilter = useCallback((e: React.MouseEvent<HTMLElement>, newValue: FilterType) => {
            changeTodolistFilter({id, filter: newValue})
        }, [changeTodolistFilter,id])


        const tasksElements = resultTasks?.map(t => {
            return <Task
                task={t}
                entity={t.entityStatus}
                key={t.id}
                todoID={id}
            />
        })
        return <Container>
            <Header>
                <EditableSpan c1={changeTodoListTitleCallback} title={title}/>
                <RemoveItem disabled={entityStatus === 'loading'} removeCallback={removeTodoListCallback}/>
            </Header>

            <AddItem variant={'standard'} disabled={entityStatus === 'loading'} addItem={addTaskCallback}/>
            <List>
                {tasksElements}
            </List>
            <Footer fullWidth size={'small'} value={filter} onChange={changeFilter} exclusive color={'primary'}>
                <ToggleButton value={'All'}>All</ToggleButton>
                <ToggleButton value={'Completed'}>Completed</ToggleButton>
                <ToggleButton value={'Active'}>Active</ToggleButton>
            </Footer>
        </Container>
    }
)


