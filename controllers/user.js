var User=require("../models/data").User
var Access=require("../models/data").Access
var Permission=require("../models/data").Permission
var Ressource=require("../models/data").Ressource
const { json } = require("express")
var form=require("../forms/user")
var mongoose=require("../models/connexion").mongoose
var db=require("../models/connexion").db





getOne= async function(req, res){
    try{
        var user=await User.findById(req.query.id)
        permissions=await Permission.find({idUser:user._id}, {idUser:0}).populate({path:"idRessource"})
        user=JSON.parse(JSON.stringify(user))
        user.ressources=permissions.map(permission=>permission.idRessource)
        res.json(200, user)
    }
    catch(error){
        res.json(error)
    }
    
}
 get=async function(req, res){
    //res.setHeader('Access-Control-Allow-Origin', req.header('origin') 
    //|| req.header('x-forwarded-host') || req.header('referer') || req.header('host'));

    
    try{
        var users= await User.find().sort({"firstName":1, "lastName":1})
        users=JSON.parse(JSON.stringify(users))
        for(var i=0; i<users.length; i++ ){
            permissions=await Permission.find({idUser:users[i]._id}, {idUser:0}).populate({path:"idRessource"})
            users[i].permissions=permissions
        }
         res.json(200, users)
    }
    catch(error){
        res.json(500, error)
    }
        
    }

    search= async function(req, res){
        
        
        search=req.query.search
        active=req.query.active

        try{
            if(active===undefined){
                users=await User.find({$or:[{firstName:{$regex:search, $options:"i"}}, {lastName:{$regex:search, $options:"i"}}, {email:{$regex:search, $options:"i"} }]})
            }
            else{
                active=active==="0"?false:true
                users=await User.find({active:active,$or:[{firstName:{$regex:search, $options:"i"}}, {lastName:{$regex:search, $options:"i"}}, {email:{$regex:search, $options:"i"} }]})

            }
            users=JSON.parse(JSON.stringify(users))
            for(var i=0; i<users.length; i++ ){
                permissions=await Permission.find({idUser:users[i]._id},{idUser:0}).populate({path:"idRessource"})
                users[i].permissions=permissions
            }
             res.json(200, users)
        }
        catch(error){
            res.json(500, error)
        }
    }
    create=async function(req, res){
        console.log(req.body)
        console.log(req.body.badge__iud)
        createUserForm= new form.CreateUserForm(
            firstName=req.body.first_name,
            lastName=req.body.last_name,
            tel=req.body.tel,
            email=req.body.email,
            badgeIUD=req.body.badge__iud,
            ressources=req.body.ressources
        )
        if( await createUserForm.isValid()){
            var cleanedData=createUserForm.cleanedData

            var otherUser=await User.findOne({tel:cleanedData.tel},{_id:1})
            if(otherUser!==null){
                createUserForm.errors.tel=("Cette valeur existe déja dans le système")
            }
            var otherUser=await User.findOne({email:cleanedData.email},{_id:1})
            if(otherUser!==null){
                createUserForm.errors.email=("Cette valeur existe déja dans le système")
            }
            var otherUser=await User.findOne({badge:{iud:cleanedData.badgeIUD}},{_id:1})
            if(otherUser!==null){
                createUserForm.errors.badgeIUD="Cette valeur existe déja dans le système"
            }
            if(Object.keys(createUserForm.errors).length!==0){
                res.json(200, {"errors":createUserForm.errors})
            }
            else{
                //const session= await db.startSession()
                try{
                    //session.startTransaction()

                    var user= await User.create({
                        firstName:cleanedData.firstName,
                        lastName:cleanedData.lastName,
                        tel:cleanedData.tel,
                        email:cleanedData.email,
                        badge:{
                            iud:cleanedData.badgeIUD,
                            },
                    })
                //user= await user.save({session})
                        //permission=Permission.create([{idUser:new mongoose.Types.ObjectId(user._id), idRessource: new mongoose.Types.ObjectId(cleanedData.ressources[i])}],{session})
                        cleanedData.ressources=cleanedData.ressources.map(function(ressource){
                            return {idUser:user._id, idRessource: new mongoose.Types.ObjectId(ressource)}
                        })
                        permissions= await Permission.create(cleanedData.ressources)
                        //permissions= await Permission.create(cleanedData.ressources, {session})
                        //await session.commitTransaction()
                        user=JSON.parse(JSON.stringify(user))
                        user.permissions=permissions
        
                        res.json(200, user)
                
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
            res.json(200, {"errors":createUserForm.errors})
        }
      
       
    }

    update= async function(req, res){
        var id=req.body.id
        console.log(req.body)
        try{
            var user= await User.findById(id)
            if(user!==null){
                createUserForm= new form.CreateUserForm(
                    firstName=req.body.first_name,
                    lastName=req.body.last_name,
                    tel=req.body.tel,
                    email=req.body.email,
                    badgeIUD=req.body.badge__iud,
                    ressources=req.body.ressources
                )
                if(await createUserForm.isValid()){
                    var cleanedData=createUserForm.cleanedData
                    var otherUser=await User.findOne({tel:cleanedData.tel},{_id:1})
                    if(otherUser!==null && otherUser._id.toString()!==user._id.toString()){ 
                        createUserForm.errors.tel=("Cette valeur existe déja dans le système")
                    }
                    var otherUser=await User.findOne({email:cleanedData.email},{_id:1})
                    if(otherUser!==null && otherUser._id.toString()!==user._id.toString()){
                        createUserForm.errors.email=("Cette valeur existe déja dans le système")
                    }
                    var otherUser=await User.findOne({badge:{iud:cleanedData.badgeIUD}},{_id:1})
                    if(otherUser!==null && otherUser._id.toString()!==user._id.toString()){
                        createUserForm.errors.badgeIUD="Cette valeur existe déja dans le système"
                    }
                    if(Object.keys(createUserForm.errors).length!==0){
                        res.json(200, {"errors":createUserForm.errors})
                    }
                    else{
                        user= await User.findByIdAndUpdate(id, {
                            firstName:cleanedData.firstName,
                            lastName:cleanedData.lastName,
                            tel:cleanedData.tel,
                            email:cleanedData.email,
                            badge:{
                                iud:cleanedData.badgeIUD,
                                },
                        }, {new:true
                        
                        })
                        await Permission.deleteMany({idUser:user._id})
                        cleanedData.ressources=cleanedData.ressources.map(function(ressource){
                            return {idUser:user._id, idRessource: new mongoose.Types.ObjectId(ressource)}
                        })
                        permissions= await Permission.create(cleanedData.ressources)
                        user=JSON.parse(JSON.stringify(user))
                        user.permissions=permissions
        
                        res.json(200, user)
                    }
                   
                }
                else{
                    res.json(200, {"errors":createUserForm.errors})
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

toggleArchived=async function(req, res){
    var id=req.query.id
    try{
        user=await User.findById(id);
        user.active=!user.active
        user.save()
        res.json(200, user)
    }
    catch(error){
        res.json(500, error)
    }
}

    delete_= async function(req, res){
        var id=req.query.id
        console.log(id)
        try{
            user=await User.findByIdAndDelete(id)
            console.log(user)
            if(user!==null){
                await Permission.deleteMany({idUser:user._id})
                await Access.deleteMany({idUser:user._id})
                res.json(200, user)
            }
            else{
                res.json(500, {error:true, message:"l'employée n'existe pas"})
            }
        }
        catch(error){
            console.log(error)
            res.json(500, error)
        }    
       
    }
       
    

   

 

exports.create=create
exports.get=get
exports.update=update
exports.delete=delete_
exports.search=search
exports.getOne=getOne
exports.toggleArchived=toggleArchived