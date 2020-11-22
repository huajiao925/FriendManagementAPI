const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    sendFrom:{type: String, required: true},
    receivedBy: {type: String, required: true},
    post: {type: String},
});

module.exports = mongoose.model("post", postSchema, "Posts");