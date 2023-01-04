import styled from "styled-components";
import {Paper} from "@mui/material";

export const Title = styled.div`
  font-weight: 700;
  text-align: center;
`


export const Content = styled.div`
    background: #f5f5f5;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 9fr;
`
export const Header = styled(Paper)`
       align-self: center;
       margin:  0 16px;
       width: 10%;
       padding: 5px;
       display: flex;
       align-items: center;
       justify-content: center;
`
export const AppBox = styled.div`
    display: grid;
    grid-template-columns: 2fr 8fr;
    height: 100vh;
`