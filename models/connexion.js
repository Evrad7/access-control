

  var mongoose=require("mongoose")

  
  //mongoose.connect("mongodb://localhost/access?replicaSet=rs",{useNewUrlParser:true, useUnifiedTopology:true})
  mongoose.connect("mongodb://localhost/access")
  var db=mongoose.connection
  
  db.on("error", function(error){
      console.log(error)
  })
  db.on("open", function(){
      console.log("Connection réussie")
  })

  exports.mongoose=mongoose
  exports.db=db
 