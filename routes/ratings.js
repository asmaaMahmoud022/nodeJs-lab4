const express = require("express")
const rating_model = require("../models/ratings")
const router= express.Router()

// list all ratings
router.get('/', (req, res, next) => {
    rating_model.find({},(err, data) => {
        if (err) {
            return res.send('Error while get data: ', err)
        } else {
            return res.json(data)
        }
    });
  })

// get ratings with id
router.get('/:id', (req, res, next) => {

    rating_model.findById(req.params.id).populate('authorId').populate('onId').exec((err, data) => {    
        if (err) {
            return res.send('Error while get data: ', err)
        } else {
            return res.json(data)
        }
    });

});

// create new rating 
router.post('/', (req, res, next) => {
    // get rating data from body
    const ratingData=req.body
    // create new instance
    const ratingInstance= new rating_model({
        rate: ratingData.rate,
        authorId: ratingData.authorId,
        onId: ratingData.onId,
        onModel: ratingData.onModel,
    });
    // save new rating to db
    ratingInstance.save((err, doc) => {
        if (err) {
            return res.send('Error while saving data: ', err)
        } else {
            return res.json(doc)
        }
    });
    // return res.send('created user');
});
   
// update rating with id
router.put('/:id', (req, res, next) => {
    const ratingData=req.body
    rating_model.findOneAndUpdate({ _id : req.params.id}, {$set: {rate: ratingData.rate, authorId: ratingData.authorId,onId: ratingData.onId, onModel: ratingData.onModel}}, (err, data) => {
        if (err) {
            return res.send('Error while update data: ', err)
        } else {
            return res.json(data)
        }
    });

});
   
// delete rating with id
router.delete('/:id', (req, res, next) => {
    rating_model.remove({ _id: req.params.id,}, (err) => {
        if (err) {
            return res.send('Error while delete rating : ', err)
        } else {
            return res.send('rating deleted successfully: ')
        }
    });
});  

module.exports = router