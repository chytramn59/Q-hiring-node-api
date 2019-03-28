const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userquestionSchema = new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    questionid:{
        type:Schema.Types.ObjectId,
        ref:'Question',
        required:true
    },
    optionid:{
        type:Schema.Types.ObjectId,
        ref:'Answer',
        required:true
    }

});

module.exports = mongoose.model('Userquestion',userquestionSchema);