

 
 import styled from "styled-components";
 import Container from "../Container";
 import {useFormik} from "formik";
 import { useNavigate } from "react-router-dom";
 
import { colors } from "../../styles/base";
import { useEffect, useState } from "react";

 const StyledInput=styled.input`
   display:inline-block;
   width:100%;
   min-height:30px;
   max-width:500px;
 `
 const StyledSelect=styled.select`
    display:inline-block;
    width:100%;
    min-height:30px;
    max-width:500px;
 `
 const StyledField=styled.div`
   margin-top:10px;
 `
 const StyledForm=styled.form`
   width:80%;
   @media (min-width:992px){
      width:75%;
   }
   @media (min-width:1200px){
      width:40%;
   }
 `
 const StyledWraper=styled.div`
   display:flex;
   justify-content:center;
  
 `
 const StyledLabel=styled.label`
  display:block;
  text-align:left;
 `
 const StyledButton=styled.button`
   background:${colors.success};
   padding:10px 20px;
   display:block;
   margin:auto;
 `
 const StyledSmallError=styled.small`
  color:${colors.danger};
  display:block;
 `
 function validate(values){
   const errors={}
   if(!values.first_name){
      errors.first_name="Ce champ est obligatoire."
   }
   else if(values.first_name.trim().length>60){
      errors.first_name="La longueur maximale de ce champ est de 60 caractères.";
   }
   if(!values.last_name){
      errors.last_name="Ce champ est obligatoire."
   }
   else if(values.last_name.trim().length>60){
      errors.last_name="La longueur maximale de ce champ est de 60 caractères.";
   }
   var regex = new RegExp(/^\+?[1-9]\d{1,14}$/)
   if (!values.tel) {
      errors.tel="Ce champ est obligatoire."
  }
  
  else if(!regex.test(values.tel.trim())) {
      errors.tel="Format de numéro invalide."
  }
  regex = new RegExp(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/)
  if (!values.email) {
      errors.email="Ce champ est obligatoire.";
  }
  else if (!regex.test(values.email.trim())) {
      errors.email="Format de d'adresse email invalide."
  }
  if(!values.badge__iud){
   errors.badge__iud="Ce champ est obligatoire."
}
else if(values.badge__iud.trim().length>60){
   errors.badge__iud="La longueur maximale de ce champ est de 60 caractères.";
}

return errors


   
 }
 function FormEmployee({user ,url}){
    //permissions.forEach(elt=>console.log(elt._id))
   const URL=url
   const GET_RESSOURCES="http://localhost:7000/ressource/get"
   const [ressources, setRessources]=useState([])
 
   const navigate=useNavigate()
   useEffect(()=>{
      fetch(GET_RESSOURCES)
      .then(response=>response.json())
      .then(data=>setRessources(data))
      .catch(error=>console.log(error))
   }, [])



   const initialValues= {
    "id":user!==undefined? user._id:"",
    first_name:user!==undefined ? user.firstName:"",
    last_name:user!==undefined? user.lastName:"",
    tel:user!==undefined? user.tel:"",
    email:user!==undefined? user.email:"",
    badge__iud:user!==undefined? user.badge.iud:"",
    ressources:user!==undefined?user.ressources.map(ressource=>ressource._id):[],
 }

    const formik=useFormik({
    enableReinitialize:true,
      initialValues:initialValues,
        
      validate,
      onSubmit:(values, {setFieldError})=>{
         fetch(URL, 
          
            {method:"POST", 
            headers:{
               "Content-Type":"application/json"
            },
            body:JSON.stringify({...values, ressources:values.ressources.join("-")})})
         .then(response=>response.json())
         .then(data=>{
            if(data.errors){
               const keys=Object.keys(data.errors)
               const values_=Object.values(data.errors)
               for(var i=0; i<keys.length; i++){
                  setFieldError(keys[i], values_[i])
               }
            }
            else{
               navigate("/employees")
            }
         })
      }
   })
    return (
    <Container page={2}>
      <StyledWraper>
         <StyledForm onSubmit={formik.handleSubmit} validateOnBlur={false} validateOnChange={false}>
          <input type="hidden" name="id" id="id"/>
         <StyledField>
            <StyledLabel htmlFor="first_name">Prénom</StyledLabel>
            <StyledInput 
            name="first_name"  
            id="first_name" 
            type="text"
            onChange={formik.handleChange}
            value={formik.values.first_name}
            onBlur={formik.handleBlur}
        
            />
            {(formik.touched.first_name && formik.errors.first_name) && 
            <StyledSmallError>
               {formik.errors.first_name}
            </StyledSmallError>
            }
         </StyledField>
         <StyledField>
            <StyledLabel htmlFor="last_name">Nom</StyledLabel>
            <StyledInput 
            name="last_name"  
            id="last_name" 
            type="text"
            onChange={formik.handleChange}
            value={formik.values.last_name}
            onBlur={formik.handleBlur}
            />
            {(formik.touched.last_name && formik.errors.last_name) && 
            <StyledSmallError>
               {formik.errors.last_name}
            </StyledSmallError>
            }
            
         </StyledField>
         <StyledField>
            <StyledLabel htmlFor="tel">Téléphone</StyledLabel>
            <StyledInput 
            name="tel"  
            id="tel" 
            type="text"
            onChange={formik.handleChange}
            value={formik.values.tel}
            onBlur={formik.handleBlur}
            />
          
            {(formik.touched.tel && formik.errors.tel) && 
            <StyledSmallError>
               {formik.errors.tel}
            </StyledSmallError>
            }
         </StyledField>
         <StyledField>
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <StyledInput 
            name="email"  
            id="email" 
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            />
            {(formik.touched.email && formik.errors.email) && 
            <StyledSmallError>
               {formik.errors.email}
            </StyledSmallError>
            }
         </StyledField>
         <StyledField>
            <StyledLabel htmlFor="badge__iud">iud du badge</StyledLabel>
            <StyledInput 
            name="badge__iud"  
            id="badge__iud" 
            type="text"
            onChange={formik.handleChange}
            value={formik.values.badge__iud}
            onBlur={formik.handleBlur}
            />
            {(formik.touched.badge__iud && formik.errors.badge__iud) && 
            <StyledSmallError>
               {formik.errors.badge__iud}
            </StyledSmallError>
            }
         </StyledField>
         <StyledField>
            <StyledLabel htmlFor="ressources">ressources</StyledLabel>
            <StyledSelect
            name="ressources"
            id="ressources"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            multiple
            value={formik.values.ressources}
            >
            {ressources.map(ressource=>
               <option   value={ressource._id}>{ressource.name}</option>
            )}    
            </StyledSelect>
            {formik.touched.ressources && formik.errors.ressources &&
               <StyledSmallError>
                  {formik.errors.ressources}
               </StyledSmallError>
            }
         </StyledField>
         <StyledField>
            <StyledButton type="submit">Enregistrer</StyledButton>
         </StyledField>
         </StyledForm>
      </StyledWraper>
   
    </Container>
    )
 }
 export default FormEmployee;