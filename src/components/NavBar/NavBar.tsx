import React from "react"
import styled from "styled-components";


type NavBarPropsType = {}

const Container = styled.div`
    background: mediumblue;
`
const Title = styled.div`
font-family: MyFont,serif;
font-size: 30px;
color: white;
text-align: center;
margin: 15px;
@media(max-width: 480px){
position: absolute;
opacity: 0;
top: 0;
}
`
const SubTitle = styled(Title)`
    font-size: 14px;
    margin: 0
`
export const NavBar: React.FC<NavBarPropsType> = React.memo(() => {
    return <Container>
        <Title>TODO-LIST</Title>

        <SubTitle>l-tasya</SubTitle>
    </Container>
})