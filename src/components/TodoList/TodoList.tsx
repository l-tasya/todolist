import React, {useCallback} from "react";
import {AddItem} from "../../common/components/AddItem/AddItem";
import {EditableSpan} from "../../common/components/EditableSpan/EditableSpan";
import {ToggleButton} from "@mui/material";
import {RemoveItem} from "../../common/components/RemoveC/RemoveItem";
import {Container, Footer, Header, List} from "./styles";
import {Task} from "./Task/Task";
import {FilterType, ITask} from "../../common/types/types";

interface IProps {
    id: string
    title: string
    tasks: ITask[]
    filter: FilterType
    setFilter: (todoListID: string, newValue: FilterType) => void
    removeTask: (todoListsID: string, taskID: string) => void
    removeTodoList: (todoListsID: string) => void
    changeCheckBox: (todoListID: string, taskID: string, newValue: boolean) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    addTask: (todoListID: string, newValue: string) => void
}

export const TodoList: React.FC<IProps> = React.memo(({title, filter, tasks, setFilter, id, removeTask, removeTodoList, changeCheckBox, changeTodoListTitle, changeTaskTitle, addTask,}) => {
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
        if (filter === "Active") {
            resultTasks = tasks.filter(t => !t.completed)
        }
        if (filter === "Completed") {
            resultTasks = tasks.filter(t => t.completed)
        }

        const changeFilter = useCallback((e: React.MouseEvent<HTMLElement>, newValue: FilterType) => {
            setFilter(id, newValue)
        }, [setFilter, id])
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


