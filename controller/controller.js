const asynchandler = require("express-async-handler")
const Contact =  require("../modals/contactmodals")
const getcontact = asynchandler(async (req,res)=>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});
const postcontact = asynchandler(async (req,res)=>{
    console.log("the body of the req=",req.body)
    const {name,email,phone} = req.body;
    if(!name||!email||!phone)
    {
        res.status(400);
        throw new Error("All fields are mendetory")
    }
    const contact = await Contact.create({
        user_id: req.user.id,
        name,
        email,
        phone,
    });
    res.status(201).json(contact)
});
const deletecontact = asynchandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    const delcontact = await Contact.findByIdAndDelete(
        req.params.id
    )

    res.status(201).json({message:`delete the contact ${req.params.id}`})
});
const editcontact = asynchandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    const updatecontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(201).json(updatecontact)
});
const getacontact = asynchandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(201).json(contact)
});


module.exports = { getcontact,deletecontact,getacontact,postcontact,editcontact };
