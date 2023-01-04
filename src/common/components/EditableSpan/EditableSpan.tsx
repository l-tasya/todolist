import { TextField } from "@mui/material"
import React, {ChangeEvent, KeyboardEventHandler, useState} from "react"



type EditableSpanPropsType = {
    c1: (value: string) => void
    title: string
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({c1, title}) =>{
    console.log("EditableSpan")
    const [state, setState] = useState(true)
    const [value, setValue] = useState(title)
    const apply = () =>{
        c1(value)
    }
    const activateEditMode = () =>{
        setState(state=>!state)
        setValue(title)
    }
    const activateViewMode = () =>{
        setState(state=>!state)
        c1(value)
    }
    const enterHandler: KeyboardEventHandler<HTMLDivElement> = (e) =>{
        if(e.key === 'Enter'){
            apply()
            setState(state=>!state)
        }
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>)=>setValue(e.currentTarget.value)

    return  state?
        <div onDoubleClick={activateEditMode}>{title}</div>
        :
        <TextField
            autoFocus
            onKeyPress={enterHandler}
            onBlur={activateViewMode}
            value={value}
            type="text"
            onChange={onChange}
            variant={"standard"}
            sx={{fontSize: '1rem'}}
        />
})