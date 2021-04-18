const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({ 
    first_name: String,
    last_name : String,
    dob       : Date,
    email     : String,
    password  : {type: "string"},
    gender    : {type: "string"},
});

// instance method
userSchema.methods.calcUserAge = function(cb){
    var birth = new Date(this.dob);
    var curr  = new Date();
    var diff = curr.getTime() - birth.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    cb(null,age);
}

//static method
userSchema.statics.genderUserCounts = function(gender,cb){
    this.count({gender: gender},cb)
}

userSchema.pre('save', function (next) {
    // check if document new
    if (this){
    // hash password
        bcrypt.hash(this.password,10,(err, hashedPassword) => {
            // replace pass property with hash value
            this.password = hashedPassword
            next()
        })
   } else { 
       next()
   }
})

const userModel = mongoose.model('User', userSchema);

userModel.genderUserCounts("female", (err,count)=>{console.log("number of femal user :",count)}) 

module.exports = userModel;