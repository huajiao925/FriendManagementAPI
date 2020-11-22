const mongoose = require('mongoose');
const { Schema } = mongoose;

const friendSchema = new Schema({
    account:{type: String, required: true, unique:  true},
    friendList: [{type: String}],
    subList: [{type: String}],
    blockList: [{type: String}]
});

module.exports = mongoose.model("friend", friendSchema, "Friends");