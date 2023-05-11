
import { useEffect, useState } from "react";
import FormEmployee from "../Components/FormEmployee";
import { useParams } from "react-router-dom";




   
 
 function UpdateEmpoyee(){
    const {id}=useParams()
   const GET_ONE_USER=`http://localhost:7000/user/get-one?id=${id}`

   const [user, setUser]=useState(
    {
        _id:"",
        firstName:"",
        lastName:"",
        tel:"",
        "email":"",
        badge:{
            iud:""
        },
        ressources:[]
    }

   )
   
   useEffect(()=>{
      fetch(GET_ONE_USER)
      .then(response=>response.json())
      .then(data=>setUser({...data, }))
      .catch(error=>console.log(error))
   }, [])


    return (
      <FormEmployee user={user} url="http://localhost:7000/user/update"/>
    )
 }
 export default UpdateEmpoyee;