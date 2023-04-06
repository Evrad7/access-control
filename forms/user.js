var Ressource=require("../models/data").Ressource


class CreateUserForm {
    constructor(firstName, lastName, tel, email, badgeIUD, ressources) {
        this.firstName = firstName
        this.lastName = lastName
        this.tel = tel
        this.email = email
        this.badgeIUD = badgeIUD
        this.ressources=ressources
        this.errors = {}
        this.cleanedData = {}

    }

    validateFirstName(firstName) {
        if (firstName === undefined || firstName.trim().length === 0) {
            throw Error("Ce champ est obligatoire")
        }
        if (firstName.trim().length > 60) {
            throw Error("La longueur maximale de ce champ est de 60 caractères")
        }
        return firstName.trim()
    }
    validateLastName(lastName) {
        if (lastName === undefined || lastName.trim().length === 0) {
            throw Error("Ce champ est obligatoire")
        }
        if (lastName.trim().length > 60) {
            throw Error("La longueur maximale de ce champ est de 60 caractères")
        }
        return lastName.trim()
    }
    validateTel(tel) {
        if (tel === undefined || tel.trim().length === 0) {
            throw Error("Ce champ est obligatoire")
        }
        var regex = new RegExp(/^\+?[1-9]\d{1,14}$/)
        if (!regex.test(tel.trim())) {
            throw Error("Format de numéro invalide")
        }
        
        return tel.trim()
    }
    validateEmail(email) {
        if (email === undefined || email.trim().length === 0) {
            throw Error("Ce champ est obligatoire")
        }
        var regex = new RegExp(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/)
        if (!regex.test(email.trim())) {
            throw Error("Format de d'adresse email invalide")
        }
        return email.trim()
    }
        validateBadgeIUD(badgeIUD) {
        if (badgeIUD === undefined || badgeIUD.trim().length === 0) {
            throw Error("Ce champ est obligatoire")
        }
        if (badgeIUD.trim().length > 60) {
            throw Error("La longueur maximale de ce champ est de 60 caractères")
        }
    
        return badgeIUD.trim()
    }
    async validateRessources (ressources){
        if(ressources===undefined){
            throw Error("Ce champ est obligatoire")
        }
        if(ressources.trim().length===0){
            ressources=[]
        }
        else{
            ressources=ressources.trim().split("-")
            ressources=Array.from(new Set(ressources))
            for(var i=0; i<ressources.length; i++){
                var ressource=await Ressource.findById(ressources[i])
                if(ressource===null){
                    throw Error("Identifient(s) invalides")
                }
            }
        }
       
        return ressources
    }

    async isValid() {
        try {
            this.cleanedData["firstName"] = this.validateFirstName(this.firstName)
        }
        catch (e) {
            this.errors["firstName"] = e.message
        }
        try {
            this.cleanedData["lastName"] = this.validateLastName(this.lastName)
        }
        catch (e) {
            this.errors["lastName"] = e.message
        }
        try {
            this.cleanedData["tel"] = this.validateTel(this.tel)
        }
        catch (e) {
            this.errors["tel"] = e.message
        }
        try {
            this.cleanedData["email"] = this.validateEmail(this.email)
        }
        catch (e) {
            this.errors["email"] = e.message
        }
        try {
            this.cleanedData["badgeIUD"] = this.validateBadgeIUD(this.badgeIUD)
        }
        catch (e) {
            this.errors["badgeIUD"] = e.message
        }
        try {
            this.cleanedData["ressources"] = await this.validateRessources(this.ressources)
        }
        catch (e) {
            this.errors["ressources"] = e.message
        }
        if (Object.keys(this.errors).length > 0) {
            return false
        }
        return true
    }

}

module.exports = { CreateUserForm }