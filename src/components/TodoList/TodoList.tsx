import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from '../../App';
import './Todolist.css'
import {AddItemInput} from './AddItemInput';

//types
export type ErrorType = null | string
type TodoListPropsType = {
    title: string
    filter: FilterType;
    id: string

    //todoList body
    tasks: Array<TaskType>

    removeTodoList: (todoListID: string) => void
    removeTasks: (removeId: string, todoListID: string) => void
    addTasks: (newTitle: string, todoListID: string) => void
    changeFilter: (todoListID: string, value: FilterType) => void
    statusChange: (id: string, changedValue: boolean, todoListID: string) => void
}


export const TodoList: React.FC<TodoListPropsType> = ({title, tasks, filter, removeTasks, addTasks, changeFilter, statusChange, id, removeTodoList}) => {
    //local state level

    const onAddTaskButtonClick = (title: string) =>{
        return addTasks(title, id);
    }
    let liElements = tasks.map(t => {
        //li event subscribers
        const onClickHandler = () => removeTasks(t.id, id);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => statusChange(t.id, e.currentTarget.checked, id)
        return <li className={t.isDone ? 'is-done' : ''} key={t.id}>
            <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
            />
            <span>
                {t.taskTitle}
            </span>
            <button onClick={onClickHandler}>x</button>
        </li>
    })
    //event subscribers
    const removeTodoLIst = () => {
        removeTodoList(id)
    }
    return <div>
        <h3 className={'title'}>{title}</h3>
        <button onClick={removeTodoLIst}>x</button>
        <div>
            <AddItemInput addTasks={onAddTaskButtonClick}/>
        </div>

        <ul>
            {liElements}
        </ul>

        <button
            className={filter === 'all' ? 'active-filter' : ''}
            onClick={() => changeFilter(id, 'all')}>All
        </button>
        <button
            className={filter === 'active' ? 'active-filter' : ''}
            onClick={() => changeFilter(id, 'active')}>Active
        </button>
        <button
            className={filter === 'completed' ? 'active-filter' : ''}
            onClick={() => changeFilter(id, 'completed')}>Completed
        </button>

    </div>
}
