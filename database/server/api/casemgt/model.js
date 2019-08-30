const mongoose=require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema=mongoose.Schema;

const caseSchema=new Schema({
    caseId:{
        type:String,
        required: true
    },
    caseName:{
        type:String,
        required: true
    },
    oppositeParty:String,
    advocateRefId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'advocate'
        
    },
    userId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"registration"
    }],
    courtId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"court"
    },
    caseType:String,
    caseStatus:{
               type:Boolean,
               default:true
           },
    flag:{
        type:Boolean,
        default:true
    },
    review:[{
         date:Date,
        remark:String
    }]
});

caseSchema.plugin(timestamps);

module.exports=mongoose.model('caseSchema',caseSchema);

