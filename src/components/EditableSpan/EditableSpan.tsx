import TextField from "@mui/material/TextField/TextField"
import React, {ChangeEvent, KeyboardEventHandler, useState} from "react"


interface IProps{
    c1: (value: string) => void
    title: string
    disabled?: boolean
}

export const EditableSpan: React.FC<IProps> = React.memo(({c1, title, disabled}) =>{
    console.log("EditableSpan")
    const [state, setState] = useState(true)
    const [value, setValue] = useState(title)
    const apply = () =>{
        c1(value)
    }
    const activateEditMode = () =>{
        if(disabled === true){
            return;
        }
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
            onKeyDown={enterHandler}
            onBlur={activateViewMode}
            value={value}
            type="text"
            onChange={onChange}
            variant={"standard"}
            sx={{fontSize: '1rem'}}
        />
})