const express = require("express");
const router = express.Router();
const Post = require('../models/post');
let nodemailer = require('nodemailer');
let cron = require('node-cron');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lyrali917@gmail.com',
      pass: '<FROM_EMAIL_PASSWORD>'
    }
});


//get all posts
router.route('/allpost').get((req, res)=>{
    return res.json;
})
//make a post
router.route('/makeapost').post(async(req, res)=>{
    var post = new Post(req.body);
    post.save().then(item=> {
        res.status(200).send("Post succeed.")
        //email schedular
        let mailOptions = {
            from: req.body['sendFrom'],
            to: req.body['receivedBy'],
            subject: 'Here is your daily post updates',
            text: 'Update: ' + req.body['post'],
        };

        cron.schedule('* * * * *', () => {
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
        });
    })
    .catch(error => {
        res.status(400).send("Failed.")
    })
     
})

module.exports = router;