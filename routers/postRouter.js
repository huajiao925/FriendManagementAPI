const express = require("express");
const router = express.Router();
const Post = require('../models/post');

//get all posts
router.route('/').get(async(req, res)=>{
    let filter = req.query;
    await Post.find(filter, (err, post)=> {
        if(err){
            return res.status(500).send(err);
        }
        return res.json(post);
    })
})


//get posts by email
router.route('/allposts/:account').get(async(req, res)=>{
    let list = await Post.find({sendFrom: req.params.account}, 'post').exec();
    return res.send(list);
    })

module.exports = router;