const express = require("express")
const user_model = require("../models/users")
const post_model = require("../models/posts")
const rating_model = require("../models/ratings")
const router= express.Router()

// list all users
router.get('/', async (req, res) => {

    try{
        const users = await user_model.find({})
        res.json(users)
    } catch(err){
        return res.send('Error while get data: ', err)
    }

  })

// get user with id
router.get('/:id', async(req, res,next) => {

    try{
        const users = await user_model.findById(req.params.id);
        const posts_var= await post_model.find({"auther":req.params.id});
        const rates= await rating_model.find({"onId":req.params.id});
            var sum = 0;
            for( var i = 0; i < rates.length; i++ ){
                sum += rates[i]["rate"]; 
            }
            var rate_avg = sum/rates.length;    
            
            res.json({
                user_data:users,
                posts:posts_var,
                average_rate:rate_avg
            });
  
    } catch(err){
        next(err)
    }

});

// create new user 
router.post('/', async(req, res, next) => {
    // get user data from body
    const userData=req.body
    // create new instance
    const userInstance= new user_model({
        first_name: userData.first_name,
        last_name: userData.last_name,
        dob: userData.dob,
        email: userData.email,
        password: userData.password,
        gender:userData.gender,
    });

    // save new user to db
    try{
        const user_save = await userInstance.save()
        res.json(userInstance)
    } catch(err){
        next(err)
    }

});
   
// update user with id
router.put('/:id', async(req, res, next) => {

const userData=req.body
try{
    const user_upd = await user_model.findOneAndUpdate({ _id : req.params.id}, {$set: 
        { first_name: userData.first_name, 
          last_name: userData.last_name,
          dob: userData.dob,
          email: userData.email,
          gender: userData.gender}})
    res.json(userData)
} catch(err){
    next(err)
}

});
   
// delete user with id
router.delete ('/:id', async(req, res, next) => {
    const user_del=await user_model.remove({ _id: req.params.id,})
    try{
        res.send('user deleted successfully: ')
    } catch(err){
        next(err)
    }

});  

module.exports = router