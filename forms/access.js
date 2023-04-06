var moment=require("moment")
var {User, Ressource}=require("../models/data")


class CreateAccessForm{
    constructor(iudUser, iudRessource){
        this.iudUser=iudUser
        this.iudRessource=iudRessource
        this.errors={}
        this.cleanedData={}

    }

    /*
    validateDate(date){
        if(date===undefined){
            throw Error("Ce champ est obligatoire")
        }
        if(!moment(date, "YYYY-MM-DD").isValid()){
            throw Error("Format de date incorrect")
        }
        return date
    }
    */
   
      async validateIUDUser(iudUser){
        if(iudUser===undefined){
            throw Error("Ce champ est obligatoire")
        }
            var user=await User.findOne({badge:{iud:iudUser}})
            if(user===null){
            }
            else{
                return user
            }
        }
    
     async validateIUDRessource (iudRessource){
        if(iudRessource===undefined){
            throw Error("Ce champ est obligatoire")
        }
        var ressource=await Ressource.findOne({iud:iudRessource})
            if(ressource===null){
                throw Error("iud de la ressource n'existe pas")
            }
            else{
                return ressource
            }
        

    }

     async isValid()  {
   
        try{
            this.cleanedData["user"]= await this.validateIUDUser(this.iudUser)
        }
        catch(e){
            this.errors["iudUser"]=e.message
        }
        try{
            this.cleanedData["ressource"]= await this.validateIUDRessource(this.iudRessource)
        }
        catch(e){
            this.errors["iudRessource"]=e.message
        }
        if(Object.keys(this.errors).length>0){
            return false
        }
        return true
    }
   
}

module.exports={CreateAccessForm}