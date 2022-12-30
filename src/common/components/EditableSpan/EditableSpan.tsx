import { TextField } from "@mui/material"
import React, {ChangeEvent, KeyboardEventHandler, useState} from "react"



type EditableSpanPropsType = {
    c1: (value: string) => void
    title: React.ReactNode
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({c1, title}) =>{
    console.log("EditableSpan")
    const [state, setState] = useState(true)

    const doubleClickHandler = ()=>{
        setState(state=>!state)
    }
    const enterHandler: KeyboardEventHandler<HTMLDivElement> = (e) =>{
        if(e.key === 'Enter'){
            setState(state=>!state)
        }
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>)=>c1(e.currentTarget.value)

    return  state?
        <div onDoubleClick={doubleClickHandler}>{title}</div>
        :
        <TextField
            autoFocus
            onKeyPress={enterHandler}
            onDoubleClick={doubleClickHandler}
            value={title}
            type="text"
            onChange={onChange}
            variant={"standard"}
            sx={{fontSize: '1rem'}}
        />
})