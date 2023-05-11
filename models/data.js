
var mongoose=require("./connexion").mongoose
var findOrCreate=require("mongoose-findorcreate")

var UserSchema=mongoose.Schema({
    active:{
        type:Boolean,
        default:true,
    },
    firstName:String,
    lastName:String,
    tel:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
    },
    badge:{
            iud:{
                type:String,
                unique:true,
                index:true,
                required:true,
            },
        },
        
    date_joined:{type:Date, default:Date.now}
})

var RessourceSchema=mongoose.Schema({
    active:{
        type:Boolean,
        default:true,
    },
    name:{
        type:String,
        unique:true,
    },
    description:String,
    iud:{
        type:String,
        unique:true,
        index:true,
        required:true,
    },
})

var AccessSchema=mongoose.Schema({
    status:Boolean,
    date:{
        type:Date,
        default:Date.now,
    },
    archived:
        {
        type:Boolean,
         default:false
        },
    idUser:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    idRessource:{
        type:mongoose.Types.ObjectId,
        ref:"Ressource"
    }
    
})

var PermissionSchema=mongoose.Schema({
    idUser:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    idRessource:{
        type:mongoose.Types.ObjectId,
        ref:"Ressource"
    }
})
PermissionSchema.plugin(findOrCreate)


var User=mongoose.model("User", UserSchema)
var Ressource=mongoose.model("Ressource", RessourceSchema)
var Access=mongoose.model("Access", AccessSchema)
var Permission=mongoose.model("Permission", PermissionSchema)

exports.User=User
exports.Ressource=Ressource
exports.Access=Access
exports.Permission=Permission