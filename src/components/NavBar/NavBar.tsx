import React from "react"
import styled from "styled-components";
import {NavBarContainer, Title} from "../../common/styles/global";




const Container = styled(NavBarContainer)`

`
const TitleC = styled(Title)`
font-family: MyFont,serif;
font-size: 30px;
color: white;
text-align: center;
margin: 15px;
`
const SubTitle = styled(TitleC)`
    font-size: 14px;
    margin: 0
`
interface IProps {}
export const NavBar: React.FC<IProps> = React.memo(() => {
    return <Container>
        <TitleC>TODO-LIST</TitleC>
        <SubTitle>l-tasya</SubTitle>
    </Container>
})