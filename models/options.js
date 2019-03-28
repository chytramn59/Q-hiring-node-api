const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    questionid:{
        type:Schema.Types.ObjectId,
        ref: 'Question',
        required:true
    },
    anstext:{
        type:String,
        required:true
    },
    isValid:{
        type:Boolean,
        require:true
    }

})

module.exports = mongoose.model('Answer',answerSchema);