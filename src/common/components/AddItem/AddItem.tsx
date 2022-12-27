import React, {ChangeEvent, KeyboardEventHandler, useState} from "react"
import TextField from "@mui/material/TextField";


type AddItemPropsType = {
    addItem: (text: string) => void
}

export const AddItem: React.FC<AddItemPropsType> = React.memo(({addItem}) => {
    console.log("AddItem")
    const [error, setError] = useState<string | null>(null)
    const [value, setValue] = useState<string>("")
    const enterKeyPressHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            if (value.trim() !== "") {
                addItem(value)
                setValue("")
            } else {
                setError("Invalid value")
            }
        }

    }
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return <TextField
        size={"small"}
        value={value}
        onChange={inputChangeHandler}
        label={"New Item"}
        error={Boolean(error)}
        helperText={error}
        onKeyPress={enterKeyPressHandler}
    />
})