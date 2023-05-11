import { useState } from "react"
import Container from "../Components/Container"
import { useParams, useNavigate} from "react-router-dom"
import { StyledWrapper, StyledButtonNo, StyledButtonYes, StyledTitle, StyledWrapperButtons, StyledSmallDanger } from "../styles/delete"



function DeleteEmployee(){
    const {id}=useParams()
    const navigate=useNavigate();
    const [error, setError]=useState("")
    const DELETE_USER=`http://localhost:7000/user/delete?id=${id}`
    
        function deleteEmployee(){
            fetch(DELETE_USER)
            .then(response=>response.json())
            .then(data=>{
                if(data.error){
                    setError(data.message)
                }
                else{
                    navigate("/employees")
                }
            })
            .catch(error=>console.log(error))
            }
        function cancel(){
            navigate("/employees")
        }
    return(
        <Container page={2}>
            <StyledWrapper> 
                <StyledTitle>Voulez vous vraiment supprimer l'employée ?? </StyledTitle>
                <StyledSmallDanger>Ceci supprimera tout l'historique des access</StyledSmallDanger>
                <StyledWrapperButtons>
                    <StyledButtonNo onClick={cancel}>Non</StyledButtonNo>
                    <StyledButtonYes  onClick={deleteEmployee}>Oui</StyledButtonYes>
                </StyledWrapperButtons>
                <StyledSmallDanger>{error}</StyledSmallDanger>

            </StyledWrapper>
        </Container>
    )
}

export default DeleteEmployee