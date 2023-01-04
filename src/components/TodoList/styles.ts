import styled from "styled-components";
import {Paper, ToggleButtonGroup} from "@mui/material";

export const Footer = styled(ToggleButtonGroup)`
  padding: 10px;
  width: 80%;
  align-items: center;
  justify-self: center;
`
export const List = styled.div`
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    //firefox
    scrollbar-color:  white;
    scrollbar-width: thin;
    //google chrome
    ::-webkit-scrollbar {
    height: 5px;
    width: 4px;
    background: white;
    }
     ::-webkit-scrollbar-thumb {
    background: #1a73e8;;
    border-radius: 4px;
    min-height: 50%;
} 
`
export const Header = styled.div`
display: flex;
align-items: center;
justify-self: center;
font-size: 20px;
    color: #3b3838;
`
export const Container = styled(Paper)`
    display: grid;
    grid-template-rows: 1fr 0.5fr 150px 1fr;
    padding: 0 16px 16px 16px;
    margin: 8px;
`