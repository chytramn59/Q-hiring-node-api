const { validationResult } = require('express-validator/check');

const Answers = require('../models/options');



exports.getById = (req,res,next) =>{
    Answers.findById({_id: req.params._id}).populate(' question')
    .then(result =>{
        res.status(200).json({
            message: 'get a single options',
            result: result
        })
    })
    .catch(err =>{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    });
    
};

exports.add = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
   const anstext = req.body.anstext;
   const question = req.body.question;
   const isValid = req.body.isValid;
   const ans = new Answers({
        anstext:anstext,
        question:question,
        isValid:isValid
   })
   ans.save()
   .then(result =>{
       res.status(200).json({
           message: 'succesfully created answer',
           result: result._id
       })
   })
   .catch(err =>{
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
});

}

exports.getbyquestionid = (req,res,next) =>{
    Answers.find().populate({path: 'question',match:{_id:req.params.qid}})
    .then(result =>{
        res.status(200).json({
            message: 'all  options',
            result: result
        })
    })
    .catch(err =>{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    });
  
};