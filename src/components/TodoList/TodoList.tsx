import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from '../../App';
import './Todolist.css'

//types
type ErrorType = null | string
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
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<ErrorType>(null)

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
    const onAddPostClickHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addTasks(newTaskTitle.trim(), id)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }

    }
    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onEnterKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onAddPostClickHandler();
        }
    }
    const removeTodoLIst = () => {
        removeTodoList(id)
    }

    return <div>
        <h3 className={'title'}>{title}</h3>
        <button onClick={removeTodoLIst}>x</button>
        <div>
            <input
                type="text"
                value={newTaskTitle}
                onKeyPress={(e) => {
                    onEnterKeyPressHandler(e)
                }}
                onChange={(e) => {
                    onInputChangeHandler(e)
                }}
                className={error ? 'error' : ''}
            />
            <button onClick={onAddPostClickHandler}>+</button>
            {error && <div className='error-message'>{error}</div>}
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