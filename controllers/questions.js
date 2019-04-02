const { validationResult } = require('express-validator/check');

const Questions = require('../models/questions');

const Options = require('../models/options');



exports.getAll = (req, res, next) => {
    Questions.find()
        .then(result => {
            res.status(200).json({
                message: 'all questions',
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getAllwithoptions = (req, res, next) => {
    Questions.aggregate([{
        $lookup: {
            from: "answers",
            localField: "_id",
            foreignField: 'questionid',
            as: "answers"
        }
    }])
        .then(result => {
            res.status(200).json({
                message: 'all questions and there options',
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.postQuestion = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const questtext = req.body.questtext;
    const createdBy = req.body.createdBy;
    const groupid = req.body.groupid;
    const quest = new Questions({
        questtext: questtext,
        createdBy: createdBy,
        groupid:groupid
    })
    quest.save()
        .then(result => {
            res.status(200).json({
                message: 'question created succsefully',
                result: result._id
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.getquestionById = (req, res, next) => {
    Questions.findById({_id:req.params._id})
        .then(result => {
            console.log(req.params._id);
            res.status(200).json({
                message: 'single questions and options',
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.postQuestionwithoptions = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const questtext = req.body.questtext;
    const createdBy = req.body.createdBy;
    const optionarray = req.body.optiondata;
    const quest = new Questions({
        questtext: questtext,
        createdBy: createdBy
    })
    quest.save()
        .then(result => {
            console.log(result._id);
            if(optionarray.length > 0){
                var resinc = 0;
                optionarray.forEach(element => {
                    const option = new Options({
                        anstext:element.anstext,
                        questionid:result._id,
                        isValid:element.isValid
                   })
                   option.save()
                   .then(result =>{
                    resinc=resinc+1;
                    if(resinc == optionarray.length){
                    res.status(200).json({
                        message: 'question and there options are entered succesfully',
                        result:result
                        
                    })
                }
                   })
                   .catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                })

                });
            }
            
            
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}



