const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupname:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:String,
        required:true
    },
    modifiedDate:{
        type:Date,
        default:null
    },
    modifiedBy:{
        type:String,
        default:null
    },
    isDeleted:{
        type:Boolean,
        default:false
    },

});

module.exports = mongoose.model('Group',groupSchema);