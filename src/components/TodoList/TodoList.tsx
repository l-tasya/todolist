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

    setFilter: (todoListID: string, newValue: FilterType) => void
    removeTask: (todoListsID: string, taskID: string) => void
    removeTodoList: (todoListsID: string) => void
    changeCheckBox: (todoListID: string, taskID: string, newValue: boolean) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    addTask:(todoListID: string, newValue: string) =>void
}
const Task = styled.div`
    display: flex;
`
const Title = styled(Task)``
export const TodoList: React.FC<TodoListPropsType> = React.memo(({
                                                                     title,
                                                                     tasks,
                                                                     setFilter,
                                                                     id,
                                                                     removeTask,
                                                                     removeTodoList,
                                                                     changeCheckBox,
                                                                     changeTodoListTitle,
                                                                     changeTaskTitle,
                                                                     addTask,
                                                                 }) => {
        const addItem = (title: string)=>addTask(id, title)
        return <div>
            <Title><EditableSpan c1={(title: string) =>changeTodoListTitle(id, title)} title={title}/>
                <button onClick={() => removeTodoList(id)}>x</button>
            </Title>
            <AddItem addItem={addItem}/>
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
