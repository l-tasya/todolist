import React from "react"
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import styled from "styled-components";
import IconButton, { IconButtonProps } from "@mui/material/IconButton/IconButton";


interface IProps {
    removeCallback: () => void
}

const Remove = styled(IconButton)`
  
`
export const RemoveItem: React.FC<IProps> = React.memo(({removeCallback}) => {
    const svg = {
        display: 'inline-block',
        fontSize: '1.2rem',
        transition: '0.3s',
        ':hover':{
            color: 'red',
            transition: '0.3s'
        }
    }
    return <Remove size='small' sx={{marginLeft: '5px'}} onClick={removeCallback}>
        <RemoveCircleIcon sx={svg}/>
    </Remove>
})