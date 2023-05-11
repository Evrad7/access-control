import { useState, useEffect } from "react"
import Container from "../Components/Container"
import { useParams } from "react-router-dom"
import FormRessource from "../Components/FormRessource"
function UpdateRessource(){
    const {id}=useParams()
   const GET_ONE_USER=`http://localhost:7000/ressource/get-one?id=${id}`

   const [ressource, setRessource]=useState(
    {
        _id:"",
        name:"",
        description:"",
        iud:"",
        users:[],
    }

   )
   
   useEffect(()=>{
      fetch(GET_ONE_USER)
      .then(response=>response.json())
      .then(data=>setRessource(data))
      .catch(error=>console.log(error))
   }, [])

    return(
       <FormRessource ressource={ressource} url="http://localhost:7000/ressource/update" />
      
    )
}

export default UpdateRessource;