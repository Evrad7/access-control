var Access=require("../models/data").Access
var User=require("../models/data").User
var Ressource=require("../models/data").Ressource
var Permission=require("../models/data").Permission
var form=require("../forms/access")
var ObjectId=require("mongoose").Types.ObjectId


get=function(req, res){

Access.find().sort({"date":-1})
.populate({path:"idUser"})
.populate({path:"idRessource"})
.then(function(users){
    res.json(users)
})
.catch(function(error){
    res.json(error)
})
    
}

 search= async function(req, res){
    var search=req.query.search
    if(search===undefined){
        search=""
    }
    var status_=req.query.status
    var archived=req.query.archived

    if (status_==="1"){
        
        status_=true
    }
    else if (status_==="0"){
        status_=false
    }
    if (archived==="1"){
        
        archived=true
    }
    else if (archived==="0"){
        archived=false
    }
    try{
        users= await User.find({$or:[{firstName:{$regex:search, $options:"i"}}, {lastName:{$regex:search, $options:"i"}}, {email:{$regex:search, $options:"i"} }]}, {_id:1})
    
        users=users.map(function(user){return user._id})
        ressources= await Ressource.find({$or:[{name:{$regex:search, $options:"i"}}]}, {_id:1})
       
        ressources=ressources.map(function(ressource){ return ressource._id})
    }
    catch(error){
        res.json(500, error)
    }

    console.log(req.query)
        filter={$and:
            [
                {$or:
                    [
                        {idUser:{$in:users}}, 
                        {idRessource:{$in:ressources}}
                    ]
                }
            ]
        }
    
    if (typeof status_=="boolean"){
        filter["$and"].push({"status":status_})
    }
    if (typeof archived=="boolean"){
        filter["$and"].push({"archived":archived})
    }
    console.log(filter)
   

    
    Access.find(filter)
    .sort({"date":-1,})
    .populate({path:"idUser"})
    .populate({path:"idRessource"})
    .then(function(access){
        res.json(200, access)
    })
    .catch(function(error){
        
        console.log(error)
        res.json(500, error)
    })
}

create= async function(req, res){
    var createAccessForm= new form.CreateAccessForm(
        req.body.iud_user,
        req.body.iud_ressource,
    )
    if( await createAccessForm.isValid()){
        var cleanedData=createAccessForm.cleanedData
        var permission=await Permission.findOne({idUser:cleanedData.user._id, idRessource:cleanedData.ressource._id})
        status_=undefined
        if(permission!==null){
            status_=true
        }
        else{
            status_=false
        }
        var access=  new Access({
            status:status_,
            idUser: new ObjectId(cleanedData.user._id) ,
            idRessource:new ObjectId(cleanedData.ressource._id),
        })
        access.save()
        .then(function(access){
            res.json(200, {status:access.status, date:access.date})
        })
        .catch(function(error){
            res.json(500, error)
            
        })
    }
    else{
        res.json(200, {"errors":createAccessForm.errors})
    }
  
   
}





toggleStatusArchived= function(req, res){
    var id=req.query.id
    Access
    
    .findById(id, {"_id":1, archived:1})
    .then(function(access){
        if(access!==null){
            Access.findByIdAndUpdate(id,  {archived:!access.archived},  {new:true})
                .then(function(access){
                    res.json(200, access)
                })
                .catch(function(error){
                    res.json(500, error)
                })
        }
        else{
            res.json(500, {"error":"invalid id"})
        }
    })
    
    .catch(function(error){
        res.json(500, error)
    })
}


    

   

 

exports.create=create
exports.get=get
exports.toggleStatusArchived=toggleStatusArchived
exports.search=search