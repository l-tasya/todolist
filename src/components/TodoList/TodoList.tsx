import React from "react";
import {TasksType} from "../../redux/reducers/tasksReducer";
import {FilterType} from "../../redux/reducers/todoListReducer";
import {AddItem} from "../../common/components/AddItem/AddItem";
import {EditableSpan} from "../../common/components/EditableSpan/EditableSpan";
import styled from "styled-components";

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
        if (filter === "Active") {
            resultTasks = tasks.filter(t => !t.isDone)
        }
        if (filter === "Completed") {
            resultTasks = tasks.filter(t => t.isDone)
        }


        const filterAll = useCallback(() => setFilter(id, "All"), [setFilter, id])
        const filterActive = useCallback(() => setFilter(id, "Active"), [setFilter, id])
        const filterCompleted = useCallback(() => setFilter(id, "Completed"), [setFilter, id])
        return <>
            <div><EditableSpan c1={changeTodoListTitleCallback} title={title}/>
                <button onClick={removeTodoListCallback}>x</button>
            </div>
            <AddItem addItem={addTaskCallback}/>
            <ul>
                {
                    resultTasks
                        .map(t => {
                            return <Task id={t.id}
                                         title={t.title}
                                         isDone={t.isDone}

                                         changeTaskTitle={changeTaskTitle}
                                         changeCheckBox={changeCheckBox}
                                         removeTask={removeTask}

                                         todoID={id}
                            />
                        })
                }
            </ul>
            <div>
                <button onClick={() => setFilter(id, "All")}>all</button>
                <button onClick={() => setFilter(id, "Completed")}>Completed</button>
                <button onClick={() => setFilter(id, "Active")}>Active</button>
            </div>
        </div>
    }
)

type TaskPropsType = {
    changeCheckBox: (todoID: string, taskID: string, newValue: boolean) => void
    changeTaskTitle: (todoID: string, taskID: string, value: string) => void
    removeTask: (todoID: string, id: string) => void
    todoID: string
    //task
    id: string
    isDone: boolean
    title: string

}

const Task: React.FC<TaskPropsType> = React.memo(({changeCheckBox, removeTask, changeTaskTitle, id, todoID, isDone, title}) => {
        const suicide = useCallback(() => removeTask(todoID, id), [])
        const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => changeCheckBox(todoID, id, e.currentTarget.checked), [changeCheckBox, id, todoID])
        const changeTitle = useCallback((value: string) => changeTaskTitle(todoID, id, value), [id, todoID, changeTaskTitle])
        return <div>
            <input type="checkbox"
                   onChange={changeStatus}
                   checked={isDone}/>
            <EditableSpan c1={changeTitle} title={title}/>
            <button onClick={suicide}>x</button>
        </div>
    }
)
