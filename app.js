express=require("express")
const cors=require("cors")
userRouter=require("./routers/user.js").router
ressourceRouter=require("./routers/ressource").router
accessRouter=require("./routers/access").router
var bodyParser=require("body-parser")


app=express()
app.use(bodyParser.json())
app.use(cors())
app.use("/user", userRouter)
app.use("/ressource", ressourceRouter)
app.use("/access", accessRouter)
app.use(express.urlencoded({extended:false}))

app.post("/", function(req, res){
    //res.setHeader("Content-Type","text/json")
    console.log(req.body)
    res.json({"Greeting":req.body})
})

app.listen(7000)

