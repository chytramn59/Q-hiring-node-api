
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
       var promise = quesans.map(element => {
       const user = new Userquestion({
        userid:userid,
        questionid:element.questionid,
        optionid:element.optionid
    })
   return user.save()
    .then(result => {
       return result
    })
    .catch(err => {
       return err
    })
});
Promise.all(promise)
.then((result)=>{
    console.log(result);
    res.status(200).json({
        result:result
    })
})
}
else{
    res.status(400).json({
        message:'atleast one question and anser must be selected'
    })
}
}