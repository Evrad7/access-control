import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Components/Container"
import { StyledTable, StyledButtonActionArchive, StyledFlex,
  StyledForm, StyledHead, StyledInput, StyledTbody, StyledTd, StyledTh, StyledThead,
   StyledTitle, StyledTr, StyledStatusFalse, StyledStatusTrue, StyledFilter, StyledFilterItem  } from "../styles/list";

  import moment from "moment";


function App() {
  const GET_ACCESS="http://localhost:7000/access/get"
  const [search, setSearch]=useState("")
  const [accesses, setAccesses]=useState([])
  const navigate =useNavigate()
  const [activeFilterArchive, setActiveFilterArchive]=useState(1)
  const [activeFilterStatus, setActiveFilterStatus]=useState(1)
 
  function toggleArchived(_id){
      const ARCHIVED_USER=`http://localhost:7000/access/toggle-archived?id=${_id}`
      fetch(ARCHIVED_USER)
      .then(response=>response.json())
      .then(data=>{
          const newUsers=accesses.filter(access=>{
              if(activeFilterArchive===2){
                  return access._id!==data._id
              }
              else if(activeFilterArchive ===3){
                  return (access._id!==data._id )
              }
              else{
                  if(access._id===data._id){
                      access.archived=data.archived
                  }
                  
                  return true
              }
                 
          }
          
              )
      setAccesses(newUsers)})
      .catch(error=>console.log(error))
  }
  function searchAccess(archived, status){
      var SEARCH_ACCESS=`http://localhost:7000/access/search?search=${search}`
      if (archived!=="__any__"){
        if(archived===true){
          setActiveFilterArchive(2)
          SEARCH_ACCESS+=`&archived=1`
        }
        else if(archived===false){
          setActiveFilterArchive(3)
          SEARCH_ACCESS+=`&archived=0`
        }
        else if(archived==="__all__"){
          setActiveFilterArchive(1)
        }
      }
      else{
        if(activeFilterArchive!==1){
          SEARCH_ACCESS+=`&archived=${activeFilterArchive===2?1:0}`
        }
     
      }
      if (status!=="__any__"){
        if(status===true){
          setActiveFilterStatus(2)
          SEARCH_ACCESS+=`&status=1`
        }
        else if(status===false){
          setActiveFilterStatus(3)
          SEARCH_ACCESS+=`&status=0`
        }
        else if(status==="__all__"){
          setActiveFilterStatus(1)
        }
      }
      else{
        if(activeFilterStatus!==1){
          SEARCH_ACCESS+=`&status=${activeFilterStatus===2?1:0}`
        }
      }
      
      fetch(SEARCH_ACCESS)
      .then(response=>response.json())
      .then(data=>setAccesses(data))
      .catch(error=>console.log(error))
  }

  useEffect(()=>{
      searchAccess("__any__", "__any__")
  }, [search])
  return (
      <Container page={1}>
         <StyledHead>
                <StyledTitle>Dashbord</StyledTitle>
                <StyledFlex>
                    <StyledForm>
                        <StyledInput placeholder="Rechercher" onKeyUp={(e)=>setSearch(e.target.value)}/>
                    </StyledForm>
                </StyledFlex>
            </StyledHead>
            <StyledFilter>
                <StyledFilterItem active={activeFilterArchive===1?true:false} onClick={()=>searchAccess("__all__", "__any__")}>Tout</StyledFilterItem>
                <StyledFilterItem active={activeFilterArchive===2?true:false} onClick={()=>searchAccess(true, "__any__")}>Archivés</StyledFilterItem>
                <StyledFilterItem active={activeFilterArchive===3?true:false} onClick={()=>searchAccess(false, "__any__")}>Non archivés</StyledFilterItem>
            </StyledFilter>
            <StyledFilter>
                <StyledFilterItem active={activeFilterStatus===1?true:false} onClick={()=>searchAccess("__any__", "__all__")}>Tout</StyledFilterItem>
                <StyledFilterItem active={activeFilterStatus===2?true:false} onClick={()=>searchAccess("__any__", true)}>autorisé</StyledFilterItem>
                <StyledFilterItem active={activeFilterStatus===3?true:false} onClick={()=>searchAccess("__any__", false)}>Refusé</StyledFilterItem>
            </StyledFilter>
            <StyledTable>
                <StyledThead>
                    <StyledTr>
                        <StyledTh>
                            Date d'access 
                        </StyledTh>
                        <StyledTh>
                            Employe
                        </StyledTh>
                        <StyledTh>
                            Ressource
                        </StyledTh>
                        <StyledTh>
                            Status
                        </StyledTh>

                        <StyledTh>
                            Actions
                        </StyledTh>
                    </StyledTr>
                </StyledThead>
                <StyledTbody>
                {accesses.map(access=>
                    <StyledTr key={access._id}>
                            <StyledTd>{moment(access.date).format("DD MMMM YYYY à hh:mm")}</StyledTd>
                            <StyledTd>{access.idUser.firstName} {access.idUser.lastName}</StyledTd>
                            <StyledTd>{access.idRessource.name}</StyledTd>
                            <StyledTd>{access.status?<StyledStatusTrue>authorisé</StyledStatusTrue>:<StyledStatusFalse>Refusé</StyledStatusFalse>}</StyledTd>

                            <StyledTd>
                                <StyledButtonActionArchive onClick={()=>toggleArchived(access._id)}>{access.archived?"Desarchiver":"Archiver"}</StyledButtonActionArchive>
                            </StyledTd>
                    </StyledTr>
                )}
                    
                    </StyledTbody>
            </StyledTable>
      </Container>
  );
}

export default App;
