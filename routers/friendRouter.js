
const express = require("express");
const friend = require("../models/friend");
const router = express.Router();
const Friend = require('../models/friend');

//get all
router.route('/').get(async(req, res)=>{
    let filter = req.query;
    await Friend.find(filter, (err, friend)=> {
        if(err){
            return res.status(500).send(err);
        }
        return res.json(friend);
    })
})

//1. create friends link 
router.route('/linkup').put((req, res)=>{
    let accountEmail = req.body['emails'][0];
    let addEmail = req.body['emails'][1];
    let isBlocked = false;

    Friend.exists({blockList: addEmail}, function(err, res){
        if(err){
            res.send(err);
        } else{
            isBlocked = true;
        }
    })

    if(isBlocked){
        return res.sent("The user has been blocked.");
    } else{
        Friend.findOneAndUpdate(
            {account: accountEmail},
            {$addToSet: {friendList: addEmail}},function(err, doc){
                if(err){
                    return res.status(500).send(err);
                } else{
                    return res.status(200).send({success: true});
                }
            });
    }
    
})

//2. get all friends by email
router.route('/allFriends/:account').get(async(req, res)=>{
    let list = await Friend.find({account: req.params.account}, 'friendList').exec();
    return res.send(list);
    })

//3. get common friends by 2 emails
router.route('/commonFriends').post(async(req, res)=>{
    try{
        const email1 = req.body['emails'][0];
        const email2 = req.body['emails'][1];
        let commonEmails = await Friend.aggregate([
            {$match: {account: {$in: [email1, email2]}}},
            {$unwind: "$friendList"},
            {$group: {_id:{id: "$account", data: "$friendList"}}},
            {$group: {_id:"$_id.data", count: {$sum: 1}}},
            {$match: {count: {$gte: 2}}},
            {$group: {_id: 0, commonFriend: {$push: "$_id"}}},
            {$project: {_id:0, commonFriend:"$commonFriend"}}
        ]).exec();
        return res.send(commonEmails);
    }
    catch (err){
        return res.status(500).send(err);
    }
})

//4. subscribe updates by email
router.route('/subscribe').put((req, res)=>{
    let accountEmail = req.body['emails'][0];
    let addEmail = req.body['emails'][1];
    Friend.findOneAndUpdate(
        {account: accountEmail},
        {$addToSet: {subList: addEmail}},function(err, doc){
            if(err){
                return res.status(500).send(err);
            } else{
                return res.status(200).send({success: true});
            }
        });
})


//5. block updates by email
router.route('/block').put(async(req, res)=>{
    let accountEmail = req.body['emails'][0];
    let blockEmail = req.body['emails'][1];

    //if it connected, remove from sublist and add into block list
    await Friend.update({$pull:{subList: blockEmail}}).exec();
    await Friend.findOneAndUpdate(
        {account: accountEmail},
        {$addToSet: {blockList: blockEmail}},function(err, doc){
            if(err){
                return res.status(500).send(err);
            } else{  
                return res.status(200).send({success: true});
            }
    }).exec();
    

})

//6. get all emails that can receive updates 
router.route('/allSubList/:account').get(async(req, res)=>{
    let list = await Friend.find({account: req.params.account}, 'subList').exec();
    return res.send(list);
})



    
module.exports = router;