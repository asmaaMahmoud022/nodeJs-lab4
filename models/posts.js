const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({ 
    title : String,
    body  : String,
    auther: { type: mongoose.Schema.Types.ObjectId , ref: "User" },
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;