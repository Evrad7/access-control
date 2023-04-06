var User=require("../models/data").User
class CreateRessourceForm{
    constructor(name, description, iud, users){
        this.name=name
        this.description=description
        this.iud=iud
        this.users=users
        this.errors={}
        this.cleanedData={}

    }

    validateName(name_){
        if(name_===undefined || name_.trim().length===0){
            throw Error("Ce champ est obligatoire")
        }
        if(name_.trim().length>60){
            throw Error("La longueur maximale de ce champ est de 60 caractères")
        }
        return name_.trim()
    }
    validateDescription(description){
        if(description===undefined || description.trim().length===0){
            throw Error("Ce champ est obligatoire")
        }
        if(description.trim().length>500){
            throw Error("La longueur maximale de ce champ est de 500 caractères")
        }
        return description.trim()
    }
   
    async validateIUD(iud){
        if(iud===undefined || iud.trim().length===0){
            throw Error("Ce champ est obligatoire")
        }
        if(iud.trim().length>60){
            throw Error("La longueur maximale de ce champ est de 60 caractères")
        }
     
        return iud.trim()
    }

    async validateUsers (users){
        if(users===undefined){
            throw Error("Ce champ est obligatoire")
        }
        if(users.trim().length===0){
            users=[]
        }
        else{
            users=users.trim().split("-")
            users=Array.from(new Set(users))
            for(var i=0; i<users.length; i++){
    
                var user=await User.findById(users[i])
                if(user===null){
                    throw Error("Identifient(s) invalides")
                }
            }
        }
       
        return users
    }
    async isValid(){
        try{
            this.cleanedData["name"]=this.validateName(this.name)
        }
        catch(e){
            this.errors["name"]=e.message
        }
        try{
            this.cleanedData["description"]=this.validateDescription(this.description)
        }
        catch(e){
            this.errors["description"]=e.message
        }
        try{
            this.cleanedData["iud"]= await this.validateIUD(this.iud)
        }
        catch(e){
            this.errors["iud"]=e.message
        }
        try {
            this.cleanedData["users"] = await this.validateUsers(this.users)
        }
        catch (e) {
            this.errors["users"] = e.message
        }
        if(Object.keys(this.errors).length>0){
            return false
        }
        return true
    }
   
}

module.exports={CreateRessourceForm}