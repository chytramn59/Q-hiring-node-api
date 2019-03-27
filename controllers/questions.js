const { validationResult } = require('express-validator/check');

const Questions = require('../models/questions');



exports.getAll = (req,res,next) =>{
    Questions.find()
    .then(result =>{
        res.status(200).json({
            message:'all users',
            result: result
        })
    })
    .catch(err =>{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    })
}

exports.postQuestion = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
   const questtext = req.body.questtext;
   const createdBy = req.body.createdBy;
        const quest = new Questions({
            questtext:questtext,
            createdBy:createdBy
        })
        quest.save()
        .then(result =>{
            res.status(200).json({
                message: 'question created succsefully',
                result:result._id
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}