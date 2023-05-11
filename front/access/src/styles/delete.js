import styled from "styled-components"
import { colors } from "./base"

 export const StyledWrapper=styled.div`
    min-height:70vh;
    display:flex;
    flex-direction:column;
    justify-content:center;

`
 export const StyledTitle=styled.h3`
    text-align:center;
    font-weight:normal;
`

 export const StyledWrapperButtons=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom:15px;

`
 export const StyledButtonYes=styled.button`
    background:${colors.danger};
    padding:10px 20px;
    margin-right:10px
    
`
 export const StyledButtonNo=styled.button`
    background:${colors.secondary};
    padding:10px 20px;
    margin-right:10px

    
`
export const StyledSmallDanger=styled.small`
    color:${colors.danger};
    text-align:center;
    font-weight:bold;
    margin-bottom:10px;
`