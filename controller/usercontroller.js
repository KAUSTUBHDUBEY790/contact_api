const asynchandler = require("express-async-handler")
const User = require("../modals/usermodal")
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
const registeruser = asynchandler(async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username||!email||!password)
    {
        res.status(400)
        throw new Error("All field are mandatory")
    }
    const useravail = await User.findOne({email});
    if(useravail){
        res.status(400)
        throw new Error("User already registered")
    }

    //hash password
    const hashpassword = await bcrypt.hash(password,10);
    console.log("hashedpassword:",hashpassword)
    const user = await User.create({
        username,
        email,
        password: hashpassword,
    })

    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({ _id: user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("User data is not valid")
    }
    res.json({message: "Register the user"})
});
const loginuser = asynchandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        res.status(400)
        throw new Error("All fields medetory")
    }
    const user = await User.findOne({email})
    if(!user)
    {
        res.status(404);
        throw new Error("No user found for the username")
    }
    const accessToken = jwt.sign({
        user:{
            username: user.username,
            eamil: user.email,
            id: user.id,
        }
    },process.env.ACCESS_TOKEN_SCREAT,
    {expiresIn:"10m"})
    if(user && (await bcrypt.compare(password,user.password)))
    {
        res.status(200).json({accessToken})

    }else{
        res.status(401)
        throw new Error("Password not valid")
    }
    res.json({message:"login the user"})
});
const currentuser = asynchandler(async (req,res)=>{
    res.json(req.user)
});

module.exports = {registeruser,loginuser,currentuser}