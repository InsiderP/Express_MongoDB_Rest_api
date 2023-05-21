const express=require("express")
const router = express.Router()
const {getContacts,createContacts,getContact,updateContact,deleteContact}=require("../controller/contactController")
const validateToken = require("../middleware/validateTokenHandler")
  
router.use(validateToken)

router.route("/" ).get(getContacts).post(createContacts)
// router.route("/" ).post(createContacts)
router.route("/:id" ).get(getContact)
router.route("/:id" ).put(updateContact)
router.route("/:id" ).delete(deleteContact)

module.exports=router