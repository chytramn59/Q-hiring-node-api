const { validationResult } = require('express-validator/check');

const Options = require('../models/options');



exports.getById = (req,res,next) =>{
    Options.findById({_id: req.params._id}).populate('questionid')
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
   const questionid = req.body.questionid;
   const isValid = req.body.isValid;
   const ans = new Options({
        anstext:anstext,
        questionid:questionid,
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
    Options.find({questionid:{$in:req.params.qid}}).populate('questionid')
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