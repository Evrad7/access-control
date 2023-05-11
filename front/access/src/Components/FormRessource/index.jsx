import Container from "../Container"
import styled from "styled-components"
import { colors } from "../../styles/base"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const { useFormik } = require("formik")





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
 const StyledTextarea=styled.textarea`
   display:inline-block;
   width:100%;
   max-width:500px;
   font-size:15px;
 `

function validate(values){
    const errors={}
    if(!values.name){
        errors.name="Ce champ est obligatoire"
    }
    else if (values.name.trim().length>60){
        errors.name="La longueur maximale de ce champ est de 60 caractères"
    }

    if(!values.description){
        errors.description="Ce champ est obligatoire"
    }
    else if(values.description.trim().length>500){
        errors.description="La longeur maximale autorisée est de 500 caractères"
    }
    if(!values.iud){
        errors.iud="Ce champ est obligatoire"
    }
    else if(values.iud.trim().length>60){
        errors.iud="La longueur maximale autorisée est de 60 caractères"
    }
    return errors
  
}
function FormRessource({ressource, url}){
    const initialValues={
        "id":ressource?._id||"",
        name:ressource?.name||"",
        description:ressource?.description||"",
        iud:ressource?.iud||"",
        users:ressource?.users.map(user=>user._id)||[],
    }
    const GET_USERS="http://localhost:7000/user/get"
    const URL=url;
    const navigate =useNavigate()
    const [users, setUSers]=useState([])
    useEffect(()=>{
        fetch(GET_USERS)
        .then(response=>response.json())
        .then(data=>setUSers(data))
        .catch(error=>console.log(error))
    }, [])
    const formik=useFormik({
        enableReinitialize:true,
        initialValues: initialValues,
        validate,
        onSubmit:(values, {setFieldError})=>{
            fetch(URL, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({...values, users:values.users.join("-")})
            })
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
                    navigate("/ressources")
                 }
            })
            .catch(error=>console.log(error))
        }    
    }
    )
    return(
        <Container page={3}>
            <StyledWraper>
            
            <StyledForm onSubmit={formik.handleSubmit} validateOnBlur={false} validateOnChange={false}>
                <input type="hidden" name="id" id="id"/>
            <StyledField>
                <StyledLabel htmlFor="name">Nom</StyledLabel>
                <StyledInput 
                name="name"  
                id="name" 
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
            
                />
                {(formik.touched.name && formik.errors.name) && 
                <StyledSmallError>
                    {formik.errors.name}
                </StyledSmallError>
                }
            </StyledField>
            <StyledField>
                <StyledLabel htmlFor="description">Description</StyledLabel>
                <StyledTextarea 
                cols="15"
                rows="5"
                name="description"  
                id="description" 
                type="text"
                onChange={formik.handleChange}
                value={formik.values.description}
                onBlur={formik.handleBlur}
            
                >
                </StyledTextarea>
                {(formik.touched.description && formik.errors.description) && 
                <StyledSmallError>
                    {formik.errors.description}
                </StyledSmallError>
                }
            </StyledField>
            <StyledField>
                <StyledLabel htmlFor="iud">IUD</StyledLabel>
                <StyledInput 
                name="iud"  
                id="iud" 
                type="text"
                onChange={formik.handleChange}
                value={formik.values.iud}
                onBlur={formik.handleBlur}
                />
                
                {(formik.touched.iud && formik.errors.iud) && 
                <StyledSmallError>
                    {formik.errors.iud}
                </StyledSmallError>
                }
            </StyledField>
            <StyledField>
                <StyledLabel htmlFor="users">Employée ayant accès</StyledLabel>
                <StyledSelect
                name="users"
                id="users"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.users}
                multiple
                >
                {users.map(user=>
                    <option key={user._id}   value={user._id}>{user.firstName}  {user.lastName}</option>
                )}    
                </StyledSelect>
                    
                    {formik.touched.users && formik.errors.users &&
                        <StyledSmallError>
                            {formik.errors.users}
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

export default FormRessource;