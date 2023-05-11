
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Components/Container"
import { StyledTable, StyledButtonActionArchive, StyledAddObject, StyledButtonActionDelete, StyledButtonActionUpdate, StyledFlex,
    StyledForm, StyledHead, StyledInput, StyledTbody, StyledTd, StyledTh, StyledThead, StyledTitle, StyledTr,
    StyledFilter, StyledFilterItem  } from "../styles/list";











function Ressources(){
    const GET_RESSOURCE="http://localhost:7000/ressource/get"
    const [ressources, setRessources]=useState([])
    const [search, setSearch]=useState("")
    const navigate =useNavigate()
    const [activeFilter, setActiveFilter]=useState(1)

    function toggleArchived(_id){
        const ARCHIVED_RESSOURCE=`http://localhost:7000/ressource/toggle-archived?id=${_id}`
        fetch(ARCHIVED_RESSOURCE)
        .then(response=>response.json())
        .then(data=>{
            const newRessources=ressources.filter(ressource=>{
                if(activeFilter===2){
                    return ressource._id!==data._id
                }
                else if(activeFilter ===3){
                    return (ressource._id!==data._id )
                }
                else{
                    if(ressource._id===data._id){
                        ressource.active=data.active
                    }
                    
                    return true
                }
                   
            }
            
                )
        setRessources(newRessources)})
        .catch(error=>console.log(error))
    }
    function updateUser(_id){
        navigate(`/ressources/${_id}/update`)
    }
    function deleteUser(_id){
        navigate(`/ressources/${_id}/delete`)
    }
    function searchRessource(archived=undefined){
       
        var SEARCH_RESSOURCE=``
        console.log(archived)
        console.log(activeFilter)
        if (archived===undefined){
            if(activeFilter===1){
                SEARCH_RESSOURCE=`http://localhost:7000/ressource/search?search=${search}`
            }
            else{
                SEARCH_RESSOURCE=`http://localhost:7000/ressource/search?search=${search}&active=${activeFilter===2?1:0}`

            }
        }
        else if(archived===true){
            setActiveFilter(2)
            SEARCH_RESSOURCE=`http://localhost:7000/ressource/search?search=${search}&active=1`
        }
        else if(archived===false){
            setActiveFilter(3)
            SEARCH_RESSOURCE=`http://localhost:7000/ressource/search?search=${search}&active=0`
        }
        else if(archived==="__all__") {
            SEARCH_RESSOURCE=`http://localhost:7000/ressource/search?search=${search}`
            setActiveFilter(1)
        }

        fetch(SEARCH_RESSOURCE)
        .then(response=>response.json())
        .then(data=>setRessources(data))
        .catch(error=>console.log(error))
    }
    useEffect(()=>{
        fetch(GET_RESSOURCE, {})
        .then(response=>response.json())
        .then(data=>setRessources(data))
        .catch(error=>console.log(error))
    }, [])
    useEffect(()=>{
        searchRessource()
    }, [search])
    return(
        <Container page={3}>
            <StyledHead>
                <StyledTitle>Les ressources</StyledTitle>
                <StyledFlex>
                    <StyledForm>
                        <StyledInput placeholder="Rechercher une ressource" onKeyUp={(e)=>setSearch(e.target.value)}/>
                    </StyledForm>
                    <StyledAddObject href="" to="/ressources/add" >Ajouter une ressource</StyledAddObject>
                </StyledFlex>
        
            </StyledHead>
            <StyledFilter>
                <StyledFilterItem active={activeFilter===1?true:false} onClick={()=>searchRessource("__all__")}>Tout</StyledFilterItem>
                <StyledFilterItem active={activeFilter===2?true:false} onClick={()=>searchRessource(true)}>Archivés</StyledFilterItem>
                <StyledFilterItem active={activeFilter===3?true:false} onClick={()=>searchRessource(false)}>Non archivés</StyledFilterItem>
            </StyledFilter>
            <StyledTable>
                <StyledThead>
                    <StyledTr>
                        <StyledTh>
                            Nom
                        </StyledTh>
                        <StyledTh>
                            Description
                        </StyledTh>
                        <StyledTh>
                            Identifiant IUD
                        </StyledTh>
                        <StyledTh>
                            Actions
                        </StyledTh>
                    </StyledTr>
                </StyledThead>
                <StyledTbody>
                {ressources.map(ressource=>
                    <StyledTr key={ressource._id}>
                        <StyledTd>{ressource.name}</StyledTd>
                            <StyledTd>{ressource.description}</StyledTd>
                            <StyledTd>{ressource.iud}</StyledTd>
                            <StyledTd>
                                <StyledButtonActionUpdate onClick={()=>updateUser(ressource._id)}>Modifier</StyledButtonActionUpdate>
                                <StyledButtonActionArchive onClick={()=>toggleArchived(ressource._id)}>{ressource.active?"Archiver":"Desarchiver"}</StyledButtonActionArchive>
                                <StyledButtonActionDelete onClick={()=>deleteUser(ressource._id)}>Supprimer</StyledButtonActionDelete>
                            </StyledTd>
                    </StyledTr>
                )}
                    
                    </StyledTbody>
            </StyledTable>
        </Container>
   
    )
}
export default Ressources;



