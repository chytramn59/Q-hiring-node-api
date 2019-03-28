const Questions = require('../models/questions');

const Answers = require('../models/options');

const Userquestion = require('../models/userquestions');


exports.getuserid = (req,res,next) =>{
    Userquestion.find({userid:{$in:req.params.id}}).populate(['userid','questionid','optionid'])
    .then(result =>{
        res.status(200).json({
            message:'users question and options',
            result:result
        })
    })
    .catch(err =>{
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.addall = (req,res,next) =>{
    const userid = req.body.userid;
    const questionid = req.body.questionid;
    const optionid = req.body.optionid;
    const user = new Userquestion({
        userid:userid,
        questionid:questionid,
        optionid:optionid
    })
    user.save()
    .then(result => {
        res.status(200).json({
            message: 'user,question and option',
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