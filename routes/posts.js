const express = require("express")
const post_model = require("../models/posts")
const rating_model = require("../models/ratings")
const router= express.Router()

// list all posts
router.get('/', (req, res, next) => {
    post_model.find({},(err, data) => {
        if (err) {
            return res.send('Error while get data: ', err)
        } else {
            return res.json(data)
        }
    });
  })

// get posts with id
router.get('/:id', (req, res, next) => {
    // post_model.findById({ _id : req.params.id},(err, post) => {
    //     post.populate("auther").execPoulate((err, data) => {
    //         if (err) {
    //             return res.send('Error while get data: ', err)
    //         } else {
    //             return res.json(data)
    //         }
    //    })
    // })

    post_model.findById(req.params.id).populate('auther').exec((err, data) => {
        rating_model.find({"onId":req.params.id},(err, rates) => {   
            var sum = 0;
            for( var i = 0; i < rates.length; i++ ){
                sum += rates[i]["rate"]; 
            }
            var rate_avg = sum/rates.length;

            return res.json({
                post_data:data,
                average_rate:rate_avg
             });
        })
    })
});

// create new post 
router.post('/', (req, res, next) => {
    // get post data from body
    const postData=req.body
    // create new instance
    const postInstance= new post_model({
        title: postData.title,
        body: postData.body,
        auther: postData.auther,
    });
    // save new post to db
    postInstance.save((err, doc) => {
        if (err) {
            return res.send('Error while saving data: ', err)
        } else {
            return res.json(doc)
        }
    });
    // return res.send('created user');
});
   
// update post with id
router.put('/:id', (req, res, next) => {
    const postData=req.body
    post_model.findOneAndUpdate({ _id : req.params.id}, {$set: { title: postData.title, body: postData.body,auther: postData.auther}}, (err, data) => {
        if (err) {
            return res.send('Error while update data: ', err)
        } else {
            return res.json(data)
        }
    });

});
   
// delete post with id
router.delete('/:id', (req, res, next) => {
    post_model.remove({ _id: req.params.id,}, (err) => {
        if (err) {
            return res.send('Error while delete post : ', err)
        } else {
            return res.send('post deleted successfully: ')
        }
    });
});  

module.exports = router