import {useState} from "react"
import Menu from "../Menu"
import styled from "styled-components"
import {colors} from "../../styles/base"

const StyledContainer=styled.div`
    transform:${props=>props.$menuExtended?"translateX(200px)":"translateX(80px)"};
    margin-right:${props=>props.$menuExtended?"200px":"80px"};
    transition:.5s;
    overflow:auto;
`

const StyledIconList=styled.svg`
    position: absolute;
    top:2px;
    left:${props=>props.$menuExtended?"125px":"28px"};
    display:inline;
    cursor:pointer;
    color:${colors.light};
    transform:scale(2);
    z-index:101;
    transition: .5s;

`
const StyledWrapper=styled.div`
    position:relative;
`
const StyledMenuWrapper=styled.div`  
    position:fixed;
    background-color: ${colors.primary};
    top:0;
    left:5px;
    min-height:100vh;
    overflow:hidden;
    transition: .5s;
    z-index: 100;
    width:${props=>props.$menuExtended?"160px":"50px"};
`
const StyledMark=styled.h3`
    text-align:end;
    margin-right:50px;
`
function Container({page, children}){
    const [menuExtended, setMenuExtended]=useState(true);
    return(
        <StyledWrapper>
          <StyledIconList $menuExtended={menuExtended} onClick={()=>setMenuExtended(!menuExtended)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </StyledIconList>
            <StyledMenuWrapper $menuExtended={menuExtended}>
                <Menu page={page}/>
            </StyledMenuWrapper>
            
            <StyledContainer $menuExtended={menuExtended}>
                <StyledMark>Logo</StyledMark>
                {children}
            </StyledContainer>
                
        </StyledWrapper>
    )
}

export default Container;