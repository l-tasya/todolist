import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = ({title, changeTitle}) => {
    let [editMode, setEditMode] = useState(false)
    let [subTitle, setSubTitle] = useState(title)

    const switchOnEditMode = () => {
        setEditMode(true);
    }
    const switchOnViewMode = () => {
        changeTitle(subTitle)
        setEditMode(false);
    }
    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSubTitle(e.currentTarget.value)
    }
    const onEnterKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            switchOnViewMode()
        }
    }
    return editMode ?
        <input value={subTitle} autoFocus onKeyPress={(e) => onEnterKeyPressHandler(e)} onChange={onInputChangeHandler}
               onBlur={switchOnViewMode} type="text"/> :
        <span onDoubleClick={switchOnEditMode}>{title}</span>
}