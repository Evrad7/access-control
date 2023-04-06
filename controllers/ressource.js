var Ressource=require("../models/data").Ressource
var Permission=require("../models/data").Permission
const { json } = require("express")
var form=require("../forms/ressource")
const { Access } = require("../models/data")
var mongoose=require("../models/connexion").mongoose
var db=require("../models/connexion").db

get= async function(req, res){
    try{
        var ressources=await Ressource.find().sort({"name":1})
        ressources=JSON.parse(JSON.stringify(ressources))
        for(var i=0; i<ressources.length; i++ ){
            permissions=await Permission.find({idRessource:ressources[i]._id}, {idRessource:0}).populate({path:"idUser"})
            ressources[i].permissions=permissions
        }
        res.json(ressources)
    }
    catch(error){
    res.json(error)
    }
    
}

search= async function(req, res){
    search=req.query.search
    try{
        ressources=await Ressource.find({$or:[{name:{$regex:search, $options:"i"}}]})
        .sort({"name":1})
        ressources=JSON.parse(JSON.stringify(ressources))
            for(var i=0; i<ressources.length; i++ ){
                permissions=await Permission.find({idRessource:ressources[i]._id}, {idRessource:0}).populate({path:"idUser"})
                ressources[i].permissions=permissions
            }
            res.json(ressources)
    }
    catch(error){
        res.json(500, error)
    }
}


create=async function(req, res){
    createRessourceForm= new form.CreateRessourceForm(
        req.body.name,
        req.body.description,
        req.body.iud,
        req.body.users
    )
    if( await createRessourceForm.isValid()){
        var cleanedData=createRessourceForm.cleanedData
        //const session= await db.startSession()
        var otherRessource=await Ressource.findOne({iud:cleanedData.iud},{_id:1})
        if(otherRessource!==null){
            createRessourceForm.errors.iud="Cette valeur existe déja dans le système"
        }
        var otherRessource=await Ressource.findOne({name:cleanedData.name},{_id:1})
        if(otherRessource!==null){
            createRessourceForm.errors.name="Cette valeur existe déja dans le système"
        }
        if(Object.keys(createRessourceForm.errors).length!==0){
            res.json(200, {"errors":createRessourceForm.errors})
        }
        else{
            try{
                //session.startTransaction()
                var ressource= await Ressource.create({
                    name:cleanedData.name,
                    description:cleanedData.description,
                    iud:cleanedData.iud,
                })
               //ressource= await ressource.save({session})
                    //permission=Permission.create([{idUser:new mongoose.Types.ObjectId(ressource._id), idRessource: new mongoose.Types.ObjectId(cleanedData.users[i])}],{session})
                    cleanedData.users=cleanedData.users.map(function(user){
                        return {idUser:new mongoose.Types.ObjectId(user), idRessource: ressource._id}
                    })
                    permissions= await Permission.create(cleanedData.users)
                    //permissions= await Permission.create(cleanedData.users, {session})
                    //await session.commitTransaction()
                    ressource=JSON.parse(JSON.stringify(ressource))
                    ressource.permissions=permissions
    
                    res.json(200, ressource)
            }
            catch(error){
                //await session.abortTransaction()
                res.json(500, error)
            }
            finally{
                //session.endSession()
            }
        }

        
    }
    else{
        res.json(200, {"errors":createRessourceForm.errors})
    }
  
   
}

update= async function(req, res){
    var id=req.body.id
    try{
        var ressource= await Ressource.findById(id)
        if(ressource!==null){
            createRessourceForm= new form.CreateRessourceForm(
                req.body.name,
                req.body.description,
                req.body.iud,
                req.body.users
            )
            if(await createRessourceForm.isValid()){
                var cleanedData=createRessourceForm.cleanedData
                var otherRessource=await Ressource.findOne({iud:cleanedData.iud},{_id:1})
                if(otherRessource!==null && otherRessource._id.toString()!==ressource._id.toString()){
                    createRessourceForm.errors.iud="Cette valeur existe déja dans le système"
                }
                var otherRessource=await Ressource.findOne({name:cleanedData.name},{_id:1})
                if(otherRessource!==null && otherRessource._id.toString()!==ressource._id.toString()){
                    createRessourceForm.errors.name="Cette valeur existe déja dans le système"
                }
                if(Object.keys(createRessourceForm.errors).length!==0){
                    res.json(200, {"errors":createRessourceForm.errors})
                }
                else{
                    ressource= await Ressource.findByIdAndUpdate(id, {
                        name:cleanedData.name,
                        description:cleanedData.description,
                        iud:cleanedData.iud,
                    }, {new:true
                    
                    })
                    await Permission.deleteMany({idRessource:ressource._id})
                    cleanedData.users=cleanedData.users.map(function(user){
                        return {idUser:new mongoose.Types.ObjectId(user), idRessource: ressource._id}
                    })
                    permissions= await Permission.create(cleanedData.users)
                    ressource=JSON.parse(JSON.stringify(ressource))
                    ressource.permissions=permissions
    
                    res.json(200, ressource)
                }
               
            }
            else{
                res.json(200, {"errors":createRessourceForm.errors})
            }
        }
        else{
            res.json(200, {"errors":{"id":"identifiant incorrect"}})
        }
    }
    
    catch(error){
        res.json(500, error)
    }
    

}
delete_= async function(req, res){
    var id=req.query.id
    console.log(req.query)
    try{
        accesses=await Access.find({idRessource:id})
        if(accesses.length===0){
                ressource=await Ressource.findByIdAndDelete(id)
                console.log(id)
                if(ressource!==null){
                    await Permission.deleteMany({idRessource:ressource._id})
                    res.json(200, ressource)
                }
                else{
                    res.json(500, "id incorrect")
                }
               
            }
        else{
            res.json(500,  "object is linked")
        }
    }
    catch(error){
        res.json(500, error)
    }    
   
}
    

   

 

exports.create=create
exports.get=get
exports.update=update
exports.delete=delete_
exports.search=search