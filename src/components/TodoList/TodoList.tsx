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
                    tasks.map(t => <Task key={t.id}><input type="checkbox"
                                                          onChange={(e) => changeCheckBox(id, t.id, e.currentTarget.checked)}
                                                          checked={t.isDone}/>
                                                          <EditableSpan c1={(title: string) =>changeTaskTitle(id, t.id, title)} title={t.title}/>
                        <button onClick={() => removeTask(id, t.id)}>x</button>
                    </Task>)
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
