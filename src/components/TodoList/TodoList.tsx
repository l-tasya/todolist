import React, {useCallback, useEffect} from 'react';
import {AddItem} from '../../common/components/AddItem/AddItem';
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';
import {RemoveItem} from '../../common/components/RemoveC/RemoveItem';
import {Container, Footer, Header, List} from './styles';
import {Task} from './Task/Task';
import {FilterType, ITaskDomain, TaskStatuses} from '../../common/types/types';
import {fetchTasksTC} from '../../redux/reducers/tasksReducer';
import {useAppDispatch} from '../../common/hooks/hooks';
import ToggleButton from '@mui/material/ToggleButton/ToggleButton';
import {RequestStatusType} from '../../redux/reducers/app-reducer';

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

export const TodoList: React.FC<IProps> = React.memo<IProps>(({title, filter, tasks, setFilter, id, removeTask, removeTodoList, changeStatus, changeTodoListTitle, changeTaskTitle, addTask, entityStatus}) => {
        const dispatch = useAppDispatch()
        useEffect(() => {
            dispatch(fetchTasksTC(id))
        }, [dispatch, id])


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
                <RemoveItem removeCallback={removeTodoListCallback}/>
            </Header>
            <AddItem variant={"standard"} addItem={addTaskCallback}/>
            <List>
                {
                    resultTasks?.map(t => {
                        return <Task id={t.id}
                                     title={t.title}
                                     isDone={t.completed}
                                     key={t.id}
                                     changeTaskTitle={changeTaskTitle}
                                     changeCheckBox={changeCheckBox}
                                     removeTask={removeTask}

                                     todoID={id}
                        />
                    })
                }
            </List>
            <Footer fullWidth size={"small"} value={filter} onChange={changeFilter} exclusive color={"primary"}
            >
                <ToggleButton value={"All"}>All</ToggleButton>
                <ToggleButton value={"Completed"}>Completed</ToggleButton>
                <ToggleButton value={"Active"}>Active</ToggleButton>
            </Footer>
        </Container>
    }
)


