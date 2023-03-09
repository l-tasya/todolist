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
import {tasksActions} from "../index";

interface IProps {
    id: string
    title: string
    tasks: ITaskDomain[]
    filter: FilterType
    entityStatus: RequestStatusType
    setFilter: (todoListID: string, newValue: FilterType) => void
    removeTask: (todoListsID: string, taskID: string) => void
    removeTodoList: (todoListsID: string) => void
    changeStatus: (todoListID: string, taskID: string, status: TaskStatuses) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    addTask: (todoListID: string, newValue: string) => void
}

export const TodoList: React.FC<IProps> = React.memo<IProps>(({
                                                                  title,
                                                                  filter,
                                                                  tasks,
                                                                  setFilter,
                                                                  id,
                                                                  removeTask,
                                                                  removeTodoList,
                                                                  changeStatus,
                                                                  changeTodoListTitle,
                                                                  changeTaskTitle,
                                                                  addTask,
                                                                  entityStatus
                                                              }) => {
        const {fetchTasksTC} = useActions(tasksActions)
        useEffect(() => {
            debugger;
            fetchTasksTC(id)
        }, [id])


        const addTaskCallback = useCallback((title: string) => addTask(id, title), [id, addTask])
        const changeTodoListTitleCallback = useCallback((title: string) => {
            changeTodoListTitle(id, title)
        }, [changeTodoListTitle, id])
        const removeTodoListCallback = useCallback(() => {
            removeTodoList(id)
        }, [id, removeTodoList])
        //filter

        let resultTasks = tasks;
        if (filter === 'Active') {
            resultTasks = tasks.filter(t => t.status === TaskStatuses.New)
        }
        if (filter === 'Completed') {
            resultTasks = tasks.filter(t => t.status === TaskStatuses.Completed)
        }

        const changeFilter = useCallback((e: React.MouseEvent<HTMLElement>, newValue: FilterType) => {
            setFilter(id, newValue)
        }, [setFilter, id])


        const tasksElements = resultTasks?.map(t => {
            return <Task
                task={t}
                entity={t.entityStatus}
                key={t.id}
                changeTaskTitle={changeTaskTitle}
                changeStatus={changeStatus}
                removeTask={removeTask}
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


