const mongoose = require("mongoose")

const rateSchema = new mongoose.Schema({ 
    rate     : {type: Number, default:0},
    authorId : { type: mongoose.Schema.Types.ObjectId , ref: "User" , required:true},
    onId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['User', 'Post']
  }

});

const rateModel = mongoose.model('Rating', rateSchema);

module.exports = rateModel;



