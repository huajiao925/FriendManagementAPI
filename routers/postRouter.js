const express = require("express");
const router = express.Router();
const Post = require('../models/post');

//get all posts
router.route('/allpost').get((req, res)=>{
    return res.json;
})


router.route('/makeapost').post(async(req, res)=>{
    var post = new Post(req.body);
    post.save().then(item=> {
        res.status(200).send("Post succeed.")
    })
    .catch(error => {
        res.status(400).send("Failed.")
    })
     
})

module.exports = router;