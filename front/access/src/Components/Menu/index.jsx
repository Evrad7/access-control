
 import styled from "styled-components";
 import {colors} from "../../styles/base"
 import {Link} from "react-router-dom";




const StyledIcon=styled.svg`
  transform: scale(1.3);
  margin-right:.5rem;
`
const StyledContainerList=styled.ul`
margin-left:-16px;
margin-top:90px;
`

const StyledItemList=styled.li`
    background-color:${props=>props.$active&&colors.light};
    & a{
        color:${props=>props.$active&&colors.dark}
    };
    display:block;
    margin-top:2rem;
    padding:.5rem .25rem;
    &:hover {
        background-color:${colors.light};
    }
    &:hover a{
        color:${colors.dark};
    }
    transition:.3s;
  
`
const StyledItemText=styled.span`
display:inline;
margin-right:1.5rem
`

const StyledLink=styled(Link)`
    white-space: nowrap;
    text-decoration: none;
    color:${colors.light};
    display:block;
    position: relative;
    z-index: 100;
    font-size:1.1rem;  
    `
function Menu({page}){
    return(
        <>
            <div>
              
                <StyledContainerList>
                    <StyledItemList className="item"  $active={page===1?true:undefined}>
                        <StyledLink to="/" >
                            <StyledItemText >
                                <StyledIcon xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-speedometer" viewBox="0 0 16 16">
                                    <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                                    <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/>
                                </StyledIcon>
                                Dashboard 
                            </StyledItemText> 
                        </StyledLink>
                    </StyledItemList>
                    <StyledItemList className="item" $active={page===2?true:undefined}>
                        <StyledLink to="/employees" >
                            <StyledItemText>
                                <StyledIcon xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                </StyledIcon>
                                Employees
                            </StyledItemText> 
                        </StyledLink>
                    </StyledItemList>
                    <StyledItemList className="item" $active={page===3?true:undefined}>
                        <StyledLink to="/ressources">
                            <StyledItemText>
                                <StyledIcon xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-closed-fill" viewBox="0 0 16 16">
                                    <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </StyledIcon> 
                                Ressources
                            </StyledItemText> 
                        </StyledLink>
                    </StyledItemList>
                    
                </StyledContainerList>
            </div>

        </>
    )
}

export default Menu;