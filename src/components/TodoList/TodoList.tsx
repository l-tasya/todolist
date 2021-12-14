import React, {ChangeEvent} from 'react';
import {FilterType, TaskItemType} from '../../App';
import s from './Todolist.module.scss'
import {AddItemInput} from './AddItemInput';
import {EditableSpan} from './EditableSpan';

//types
export type ErrorType = null | string
type TodoListPropsType = {
    title: string
    filter: FilterType;
    id: string
    tasks: Array<TaskItemType>
    removeTasks: (taskID: string, todoListID: string) => void
    addTasks: (newTaskTitle: string, todoListID: string) => void
    changeFilter: (filterNew: FilterType, todoListID: string) => void
    changeTaskCheckbox: (taskID: string, changedValue: boolean, todoListsID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, changedValue: string, todoListsID: string) => void
    changeTodoListTitle: (newTitle: string, todoListsID: string) => void
}


export const TodoList: React.FC<TodoListPropsType> = (props) => {
    const addTask = (title: string) => {
        return props.addTasks(title, props.id);
    }
    const removeTodoLIst = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (title: string)=>props.changeTodoListTitle(title, props.id)
    let liElements = props.tasks.map(t => {
        const removeTask = () => props.removeTasks(t.id, props.id);
        const changeTaskCheckbox = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskCheckbox(t.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id,title,props.id)
        return <li className={t.isDone ? s.todoList__isDone : ''} key={t.id}>
            <input
                type="checkbox"
                onChange={changeTaskCheckbox}
                checked={t.isDone}
            />
            <EditableSpan changeTitle={changeTaskTitle} title={t.taskTitle}/>
            <button onClick={removeTask}>x</button>
        </li>
    })

    return <div className={s.todoList}>
        <div className={s.todoList__title}>
            <div><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/></div>
            <button onClick={removeTodoLIst}>×</button>
        </div>
        <div className={s.todoList__addTasks}>
            <AddItemInput addTasks={addTask}/>
        </div>
        <ul className={s.todoList__tasks}>
            {liElements}
        </ul>
        <div className={s.todoList__filters}>
            <button
                className={s.todoList__filterButton + ` ${props.filter === 'all' ? s.todoList__activeFilter : s.filter}`}
                onClick={() => props.changeFilter('all', props.id)}>All
            </button>
            <button
                className={s.todoList__filterButton + ` ${props.filter === 'active' ? s.todoList__activeFilter : s.filter}`}
                onClick={() => props.changeFilter( 'active', props.id)}>Active
            </button>
            <button
                className={s.todoList__filterButton + ` ${props.filter === 'completed' ? s.todoList__activeFilter : s.filter}`}
                onClick={() => props.changeFilter('completed', props.id)}>Completed
            </button>
        </div>

    </div>
}

