import React, {useState} from "react"



type EditableSpanPropsType = {
    c1: (value: string) => void
    title: string
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({c1, title}) =>{
    const [state, setState] = useState(true)
    const doubleClickHandler = ()=>{
        console.log('')
        setState(state=>!state)
    }
    const enterHandler = (e: KeyboardEvent) =>(e.key === 'Enter') && setState(true)

    // @ts-ignore
    return  state?<div onDoubleClick={doubleClickHandler}>{title}</div>: <input autoFocus onKeyPress={enterHandler} onDoubleClick={doubleClickHandler} value={title} type="text" onChange={(e)=>c1(e.currentTarget.value)}/>
})