import React, {useCallback, useMemo} from "react";
import {TasksType} from "../../redux/reducers/tasksReducer";
import {FilterType} from "../../redux/reducers/todoListReducer";
import {AddItem} from "../../common/components/AddItem/AddItem";
import {EditableSpan} from "../../common/components/EditableSpan/EditableSpan";
import {ToggleButton} from "@mui/material";
import {RemoveItem} from "../../common/components/RemoveC/RemoveItem";
import {Title} from "../../common/styles/global";
import {Container, Footer, Header, List} from "./styles";
import {Task} from "./Task/Task";

type TodoListPropsType = {
    id: string
    title: string
    tasks: TasksType
    filter: FilterType
    setFilter: (todoListID: string, newValue: FilterType) => void
    removeTask: (todoListsID: string, taskID: string) => void
    removeTodoList: (todoListsID: string) => void
    changeCheckBox: (todoListID: string, taskID: string, newValue: boolean) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    addTask: (todoListID: string, newValue: string) => void
}


export const TodoList: React.FC<TodoListPropsType> = React.memo(({title, filter, setFilter, tasks, id, removeTask, removeTodoList, changeCheckBox, changeTodoListTitle, changeTaskTitle, addTask,}) => {
        const addTaskCallback = useCallback((title: string) => {
            addTask(id, title)
        }, [id, addTask])
        const changeTodoListTitleCallback = useCallback((title: string) => {
            changeTodoListTitle(id, title)
        }, [changeTodoListTitle, id])
        const removeTodoListCallback = useCallback(() => {
            removeTodoList(id)
        }, [id, removeTodoList])
        //filter
        let resultTasks = tasks;

        useMemo(() => {
            if (filter === "Active") {
                resultTasks = tasks.filter(t => !t.isDone)
            }
            if (filter === "Completed") {
                resultTasks = tasks.filter(t => t.isDone)
            }
        }, [filter])

        const changeFilter = useCallback((e: React.MouseEvent<HTMLElement>, newValue: FilterType) => {
            setFilter(id, newValue)
        }, [setFilter, id])
        return <Container>
            <Header>
                <EditableSpan c1={changeTodoListTitleCallback} title={<Title>{title}</Title>}/>
                <RemoveItem removeCallback={removeTodoListCallback}/>
            </Header>
            <AddItem variant={"standard"} addItem={addTaskCallback}/>
            <List>
                {
                    resultTasks
                        .map(t => {
                            return <Task id={t.id}
                                         title={t.title}
                                         isDone={t.isDone}
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


