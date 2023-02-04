import styled from "styled-components";


export const Title = styled.div`
  font-weight: 700;
  text-align: center;
`
export const Content = styled.div`
    background: #f5f5f5;
    display: grid;
    grid-gap: 8px;
    padding: 8px;
    grid-template-columns: 1fr;
    grid-template-rows: 50px 9fr;
    grid-area: c;
`
export const Header = styled.div`
    display: flex;
     @media(max-width: 768px){
       justify-content: center;
      }
    .add-container{
      display: flex;
      align-items: center;
      padding: 0 5px;
    }
`
export const NavBarContainer = styled.div`
    grid-area: n;
    background: mediumblue;
    display: flex;
    align-items: center;
    flex-direction: column;
      @media(max-width: 768px){
        flex-direction: row ;
        align-items: baseline;
        padding: 5px 0;
      }
`

export const Wrapper = styled.div`
    display: grid;
    grid-template-areas: "n c" "n c";
    grid-template-columns: 2fr 8fr;
    height: 100vh;
    @media(max-width: 768px){
        grid-template-columns: 1fr;
        grid-template-rows: 60px 8fr;
         grid-template-areas: "n n" "c c";
    }
`