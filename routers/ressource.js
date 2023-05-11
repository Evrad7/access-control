express=require("express")
router=express.Router()
controller=require("../controllers/ressource")
router.use(express.urlencoded({extended:false}))


router.get("/get", controller.get)
router.get("/get-one", controller.getOne)
router.post("/create", controller.create)
router.post("/update", controller.update)
router.get("/delete", controller.delete)
router.get("/search", controller.search)
router.get("/toggle-archived", controller.toggleArchived)

exports.router=router