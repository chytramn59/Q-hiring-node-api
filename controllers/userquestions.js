
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
    var quesans = req.body.questionAnswer;
   if(quesans.length > 0){
       var resinc = 0;
   quesans.forEach(element => {
       const user = new Userquestion({
        userid:userid,
        questionid:element.questionid,
        optionid:element.optionid
    })
    user.save()
    .then(result => {
       resinc=resinc+1;
       if(resinc == quesans.length){
        res.status(200).json({
            message: 'user,question and option',
            result: result._id
        
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
else{
    res.status(400).json({
        message:'atleast one question and anser must be selected'
    })
}
}