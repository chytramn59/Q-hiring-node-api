const { validationResult } = require('express-validator/check');

const Group = require('../models/groups');



exports.creategroup = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {groupname,createdBy} = req.body;
    const groups = new Group({
        groupname:groupname,
        createdBy:createdBy
    })
    groups.save()
    .then(result =>{
        res.status(201).json({
            message:'succesfully created group',
            result:result._id
        })
    })
    .catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })

    
}

exports.getall = (req,res,next) =>{
    Group.aggregate([{

        $lookup: {
            from: "questions",
            localField: "_id",
            foreignField: 'groupid',
            as: "questions"
        }
        },{
            $unwind:{
                path: "$questions",
                preserveNullAndEmptyArrays: true
            }
        },
        {
        $lookup:{
            from: "options",
            localField: "_id",
            foreignField: 'questionid',
            as: "questions.options"

        }

    }])
    .then(result =>{
        res.status(200).json({
            message:'grops and questiom',
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