
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Components/Container"
import { StyledTable, StyledButtonActionArchive, StyledAddObject, StyledButtonActionDelete, StyledButtonActionUpdate, StyledFlex,
StyledForm, StyledHead, StyledInput, StyledTbody, StyledTd, StyledTh, 
StyledThead, StyledTitle, StyledTr, StyledFilter, StyledFilterItem  } from "../styles/list";
const moment=require("moment")












function Employees(){
    const GET_USER="http://localhost:7000/user/get"
    const [search, setSearch]=useState("")
    const [users, setUsers]=useState([])
    const navigate =useNavigate()
    const [activeFilter, setActiveFilter]=useState(1)
   

    function updateUser(_id){
        navigate(`/employees/${_id}/update`)
    }
    function deleteUser(_id){
        navigate(`/employees/${_id}/delete`)
    }
    function toggleArchived(_id){
        const ARCHIVED_USER=`http://localhost:7000/user/toggle-archived?id=${_id}`
        fetch(ARCHIVED_USER)
        .then(response=>response.json())
        .then(data=>{
            const newUsers=users.filter(user=>{
                if(activeFilter===2){
                    return user._id!==data._id
                }
                else if(activeFilter ===3){
                    return (user._id!==data._id )
                }
                else{
                    if(user._id===data._id){
                        user.active=data.active
                    }
                    
                    return true
                }
                   
            }
            
                )
        setUsers(newUsers)})
        .catch(error=>console.log(error))
    }
    function searchUser(archived=undefined){
       
        var SEARCH_USER=``
        if (archived===undefined){
            if(activeFilter===1){
                SEARCH_USER=`http://localhost:7000/user/search?search=${search}`
            }
            else{
                SEARCH_USER=`http://localhost:7000/user/search?search=${search}&active=${activeFilter===2?1:0}`

            }
        }
        else if(archived===true){
            setActiveFilter(2)
            SEARCH_USER=`http://localhost:7000/user/search?search=${search}&active=1`
        }
        else if(archived===false){
            setActiveFilter(3)
            SEARCH_USER=`http://localhost:7000/user/search?search=${search}&active=0`
        }
        else if(archived==="__all__") {
            SEARCH_USER=`http://localhost:7000/user/search?search=${search}`
            setActiveFilter(1)
        }

        fetch(SEARCH_USER)
        .then(response=>response.json())
        .then(data=>setUsers(data))
        .catch(error=>console.log(error))
    }
    useEffect(()=>{
        fetch(GET_USER)
        .then(response=>response.json())
        .then(data=>setUsers(data))
        .catch(error=>console.log(error))
    }, [])
    useEffect(()=>{
        searchUser()
    }, [search])
    return(
        <Container page={2}>
            <StyledHead>
                <StyledTitle>Les employés</StyledTitle>
                <StyledFlex>
                    <StyledForm>
                        <StyledInput placeholder="Rechercher un employé" onKeyUp={(e)=>setSearch(e.target.value)}/>
                    </StyledForm>
                    <StyledAddObject href="" to="/employees/add" >Ajouter un employé</StyledAddObject>
                </StyledFlex>
            </StyledHead>
            <StyledFilter>
                <StyledFilterItem active={activeFilter===1?true:false} onClick={()=>searchUser("__all__")}>Tout</StyledFilterItem>
                <StyledFilterItem active={activeFilter===2?true:false} onClick={()=>searchUser(true)}>Archivés</StyledFilterItem>
                <StyledFilterItem active={activeFilter===3?true:false} onClick={()=>searchUser(false)}>Non archivés</StyledFilterItem>
            </StyledFilter>
            <StyledTable>
                <StyledThead>
                    <StyledTr>
                        <StyledTh>
                            Prénom 
                        </StyledTh>
                        <StyledTh>
                            Nom
                        </StyledTh>
                        <StyledTh>
                            Téléphone
                        </StyledTh>
                        <StyledTh>
                            Email
                        </StyledTh>
                        <StyledTh>
                            iud
                        </StyledTh>
                        <StyledTh>
                            Date d'ajout
                        </StyledTh>
                        <StyledTh>
                            Actions
                        </StyledTh>
                    </StyledTr>
                </StyledThead>
                <StyledTbody>
                {users.map(user=>
                    <StyledTr key={user._id}>
                        <StyledTd>{user.firstName}</StyledTd>
                            <StyledTd>{user.lastName}</StyledTd>
                            <StyledTd>{user.tel}</StyledTd>
                            <StyledTd>{user.email}</StyledTd>
                            <StyledTd>{user.badge.iud}</StyledTd>
                            <StyledTd>{moment(user.date_joined).format("DD MMMM YYYY à hh:mm")}</StyledTd>
                            <StyledTd>
                                <StyledButtonActionUpdate onClick={()=>updateUser(user._id)}>Modifier</StyledButtonActionUpdate>
                                <StyledButtonActionArchive onClick={()=>toggleArchived(user._id)}>{user.active?"Archiver":"Desarchiver"}</StyledButtonActionArchive>
                                <StyledButtonActionDelete onClick={()=>deleteUser(user._id)}>Supprimer</StyledButtonActionDelete>
                            </StyledTd>
                    </StyledTr>
                )}
                    
                    </StyledTbody>
            </StyledTable>
        </Container>
   
    )
}
export default Employees;



