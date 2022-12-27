import React, {ChangeEvent, useState} from "react"
import TextField from '@mui/material/TextField';


type AddItemPropsType = {
    addItem: (text: string) =>void
}

export const AddItem: React.FC<AddItemPropsType> = React.memo(({addItem}) => {
    console.log(AddItem)
    const [error, setError] = useState('')
    const [value, setValue] = useState('')
    const sendCallback = () =>{
        if(value.trim() !== ''){
            addItem(value)
            setValue('')
        }
        else{
            setError('invalid value')
        }
    }
    const enterHandler = (e: any) => e.key === 'Enter' && sendCallback()
    const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>{
        if(error){
            setError('')
        }
        setValue(e.currentTarget.value)
    }
    return <TextField
        size={'small'}
        value={value}
        onChange={changeHandler}
        label={'New Item'}
        error={Boolean(error)}
        helperText={error}
        onKeyPress={enterHandler}
    />
})