import React from 'react'
import styled from 'styled-components';
import {NavBarContainer, Title} from '../../common/styles/global';
import {useAppSelector} from '../../common/hooks/hooks';
import Grid from '@mui/material/Grid/Grid';
import Button from '@mui/material/Button/Button';
import {authActions} from "../../features/Auth";
import {useActions} from "../../utils/redux-utils";


const Container = styled(NavBarContainer)`
  justify-content: space-between;
  padding: 8px;
`
const TitleC = styled(Title)`
  font-family: MyFont, serif;
  font-size: 30px;
  color: white;
  text-align: center;
  margin: 15px;
`
export const SubTitle = styled(TitleC)`
  font-size: 14px;
  margin: 0
`
const Status = styled.div`
  width: 10px;
  height: 10px;
  border: 1px solid white;
  border-radius: 50%;
  margin-left: 5px;
  transition: 1s;
`

interface IProps {
}

export const NavBar: React.FC<IProps> = React.memo(() => {
    const {logOutTC} = useActions(authActions)
    let value = useAppSelector(t => t.auth.isLoggedIn)
    const style = {
        background: value ? '#62d74d' : '#f16868',

    }
    return <Container>
        <div>
            <TitleC>T0DO-LIST</TitleC>
            <Grid container alignItems={'center'} direction={'row'} justifyContent="center"><SubTitle>l-tasya</SubTitle><Status
                style={style}/></Grid>
        </div>
        <Button size={'small'} onClick={() => logOutTC()}>
            Log Out
        </Button>
    </Container>
})