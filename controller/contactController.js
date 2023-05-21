const asyncHandler = require("express-async-handler")
const Contact=require("../models/contactModel")


//@desc get all contacts
// @routes get api/contacts
// @access private
const getContacts=asyncHandler(async(req,res)=>{
    const contacts= await Contact.find({user_id:req.user.id})
    res.status(200).json( contacts)
})


//@desc create all contacts
// @routes post api/contacts
// @access private
const createContacts = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body)
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
      res.status(400)
      throw new Error("All fields are mandatory !")
    }
    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    })
  
    res.status(201).json(contact)
  })
  

//@desc get all contacts
// @routes get api/contacts/:id
// @access private
const getContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contact are not found")
    }
    res.status(200).json(contact)
}
)
// const errorHandler = (err, req, res, next) => {
//     // error handling code here
//   }
//@desc update all contacts
// @routes putt api/contacts/:id
// @access private
const updateContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("user don't have permission to update other user contacts")
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact)
})

//@desc delete all contacts
// @routes delete api/contacts/:id
// @access private
const deleteContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("user don't have permission to delete other user contacts")
    }
    await Contact.deleteOne({ _id: req.params.id })
    res.status(200).json(contact)
}
)

module.exports={getContacts,createContacts,getContact,updateContact,deleteContact}