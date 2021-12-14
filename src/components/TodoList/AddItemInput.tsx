import React, {ChangeEvent, useState} from 'react';
import {ErrorType} from './TodoList';
import s from './Todolist.module.scss'

type AddItemInputPropsType = {
    addTasks: (newTitle: string) => void
}
export const AddItemInput: React.FC<AddItemInputPropsType> = (props) => {
    //local state
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<ErrorType>(null);

    const onAddPostClickHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTasks(newTaskTitle.trim())
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

    return <div>
        <input
            type="text"
            value={newTaskTitle}
            onKeyPress={(e) => {
                onEnterKeyPressHandler(e)
            }}
            onChange={(e) => {
                onInputChangeHandler(e)
            }}
            className={error ? s.error : ''}
        />
        <button onClick={onAddPostClickHandler}>+</button>
        {error && <div className={s.todoList__errorMessage}>{error}</div>}
    </div>
}