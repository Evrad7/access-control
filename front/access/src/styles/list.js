import styled from "styled-components";
import { colors } from "./base";
import { Link } from "react-router-dom";

export const StyledTable=styled.table`
       width:90%;
       border-collapse:collapse;
       overflow:auto;
`
export const StyledTr=styled.tr`
    &:hover{
        background:#DDDDDD;
    }
    transition:.2s;
`
export const StyledTh=styled.th`
    border:solid 1px ${colors.secondary};
    text-align:left;
    padding-left:10px;
`
export const StyledTd=styled.td`
    border:solid 1px ${colors.secondary};
    text-aligh:left;
    height:50px;
    padding-left:10px;

`
export const StyledThead=styled.thead`
    height:50px;
`
export const StyledTbody=styled.tbody`

`
export const StyledButtonActionUpdate=styled.button`
    padding:10px 20px;
    background:${colors.secondary};
    outline:none;
    margin-right:5px;
`
export const StyledButtonActionDelete=styled.button`
    color:#FFFFFF;
    background:crimson;
    padding:10px 20px;
    outline:none;

    border-radius:5px;
    border-color:crimson

    outline:none;
`
export const StyledButtonActionArchive=styled.button`
    color:${colors.dark};
    background:${colors.secondary};
    padding:10px 20px;
    outline:none;

    border-radius:5px;
    border-color:crimson

    outline:none;
`
export const StyledHead=styled.div`
 width:80%;
    margin-right:20px;
 padding-top:20px;
 display:flex;
 justify-content:space-between;
 align-items:center;
 flex-wrap:wrap;
`
export const StyledTitle=styled.h1`
`
export const StyledAddObject=styled(Link)`
    color:${colors.success};

`
export const StyledForm=styled.form`
    
`
export const StyledInput=styled.input`
    margin-right:20px;
    min-height:30px;
`
export const StyledFlex=styled.div`
    display:flex;
`

export const StyledStatusTrue=styled.div`
    color:${colors.success};
`
export const StyledStatusFalse=styled.div`
color:${colors.danger};

`

export const StyledFilter=styled.div`
    display:inline-flex;
    padding:20px 5px;
    flew-wrap:wrap;
    margin-bottom:20px;
    border:1px solid ${colors.secondary};
    margin-right:10px;
    
`
export const StyledFilterItem=styled.div`
    position:relative;
    margin-right:20px;
    cursor:pointer;
    font-style:italic;
   
    &:before{
    margin:auto;
    position:absolute;
    bottom:-9px;
    right:0;
    content:"";
    height:2px;
    background:${colors.primary};
    width:0%;
    transition:.3s;

    };
    ${props=>{
        if(props.active){
            return `
            color:${colors.primary};
            &:before{
                width:100%;
            
            }
            `
        }
    }};
    &:hover{
        color:${colors.primary};
        &:before{
            width:100%;
        }
    }
`

