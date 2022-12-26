import React from "react";
import {FilterType, TasksType} from "../../App";


type TodoListPropsType = {
    id: string
    title: string
    tasks: TasksType

    setFilter: (todoListID: string, newValue: FilterType) => void
    removeTask: (todoListsID: string, taskID: string)=>void
    removeTodoList: (todoListsID: string)=>void
    changeCheckBox: (todoListID: string, taskID: string, newValue: boolean)=>void
}
export const TodoList: React.FC<TodoListPropsType> = React.memo(({title, tasks, setFilter, id,removeTask,removeTodoList, changeCheckBox
                                                                 }) => {
        return <div>
            <div>{title}<button onClick={()=>removeTodoList(id)}>x</button></div>
            <ul>
                {
                    tasks.map(t => <div key={t.id}><input type="checkbox" onChange={(e)=>changeCheckBox(id, t.id ,e.currentTarget.checked)} checked={t.isDone}/>{t.title}<button onClick={()=>removeTask(id, t.id)}>x</button></div>)
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
