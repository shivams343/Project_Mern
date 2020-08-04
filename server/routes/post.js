const express=require('express')
const router = express.Router()
const mongoose= require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const { json } = require('express')
const Post= mongoose.model("Post")

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,contact,location} = req.body
    if(!title || !body || !contact || !location){
        res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password =undefined
   const post = new Post({
       title,
       body,
       contact,
       location,
       postedBy:req.user
   })
   post.save().then(result=>{
       res.json({post:result})
   })
   .catch(err=>{
       console.log(err)
   })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate( "PostedBy", "_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router