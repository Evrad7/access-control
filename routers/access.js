express=require("express")
router=express.Router()
controller=require("../controllers/access")
router.use(express.urlencoded({extended:false}))


router.get("/get", controller.get)
router.get("/toggle-status-archived", controller.toggleStatusArchived)
router.get("/search", controller.search)
router.post("/create", controller.create)

exports.router=router