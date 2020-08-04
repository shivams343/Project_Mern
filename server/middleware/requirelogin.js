const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys') 
const mongoose = require("mongoose")
const User=mongoose.model("User")

module.exports =(req,res,next)=>{
    const{authorization} = req.headers
    //authorization == Bearer token
    if(!authorization){
        res.status(401).json({error: "you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            res.status(402).json({error:"You must be logged n"})
        }

        const{_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
     
    })
}