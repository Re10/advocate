const casemodel = require('./model');
const get = require('lodash/get');
const { validationService } = require('../../helper');
async function create(req, res) {
    try {
       console.log('Case Deatil.', get(req, 'body', ''));
        let caseReviewVar = [];
        for (let i = 0; i < get(req, 'body.caseReviews', '').length; i++) {
            caseReviewVar[i] = {
                date: req.body.caseReviews[i].date,
                remark: req.body.caseReviews[i].remark
            }
        }
        let caseData = new casemodel();
        caseData.caseId = get(req, 'body.caseId', '');
        caseData.caseName = get(req, 'body.caseName', '');
        caseData.advocateRefId = get(req, 'body.advocateRefId', '');
        caseData.userId = get(req, 'body.userId', '');
        caseData.courtId = get(req, 'body.courtId', '');
        caseData.caseType = get(req, 'body.caseType', '');
        caseData.review=caseReviewVar;
        console.log('Details=>',caseData);
     
        let validationResponse = await validationService.validation(caseData);
        if (validationResponse === false) {
            return Promise.reject('Validation Fails.');
        }
      
        let response = await casemodel.findOne({ 'caseId': get(req, 'body.caseId', '') });
        if (response) {
            return Promise.reject('CaseId Already Present.');
        }
       await caseData.save().exec();

        return {
            status: 200,
            message: 'Document Save Successfull.'
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    }
}

async function getRecord(req, res) {
    try {
        console.log('Case Records.', req);
        const record = req.query.id ?
            await casemodel.findOne({ _id: req.query.id, 'flag': true }).exec() :
            await casemodel.find({ 'flag': true }).exec();

        res.status(200).json({ status: 'success', message: 'success', doc: record });
        return {
            status: 200,
            message: 'success.'
        };

    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    }
}

async function update(req, res) {
    try {
        console.log('Case Data For Edit', get(req, 'body', ''), get(req, 'query.id', ''));
        let record = await casemodel.findById({ '_id': req.query.id, 'flag': true });
        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        console.log('data Found', record);
        let validationResponse = await validationService.validation(get(req, 'body', ''));
        if (validationResponse === false) {
            return Promise.reject('Validation Fails.');
        }
      
        let caseReviewVar = [];
        for (let i = 0; i < get(req, 'body.caseReviews', '').length; i++) {
            caseReviewVar[i] = {
                date: req.body.caseReviews[i].date,
                remark: req.body.caseReviews[i].remark
            }
        }
       
        record.caseId = get(req, 'body.caseId', '');
        record.caseName = get(req, 'body.caseName', '');
        record.advocateRefId = get(req, 'body.advocateRefId', '');
        record.userId = get(req, 'body.userId', '');
        record.courtId = get(req, 'body.courtId', '');
        record.caseType = get(req, 'body.caseType', '');
        record.review=caseReviewVar;
      
        console.log('Record Details=>', record);
        await record.save();
        return {
            status: 200,
            message: 'Document Update Successful.'
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    }
}

async function deleteRecord(req, res) {
    try {
        console.log('Delete Id', req.query.id);
        let record = await casemodel.findOne({ '_id': req.query.id });
        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        record.flag = false;
        await record.save();
        return {
            status: 200,
            message: 'Document Delete Successful.'
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    }
}

async function getMonthlyReports(req,res){
    try{
        console.log('case in a month data');
    
        // let response=await casemodel.find({
        //     "createdAt" : {
        //         $lte : new Date(),
        //         $gt :new Date().setDate(new Date().getDate()-30)// go back 30 days.
        //     }
        // })
        let response=await casemodel.aggregate([
            
            { $match: {"createdAt": {
                        $lte : new Date(),
                       $gte :new Date(new Date().setDate(new Date().getDate()-30))// go back 30 days.
                    }
               }}, 
             { 
               $group: {
                 _id: null, 
                   count: {
                  $sum: 1
                 }
                }
            }
          ]);

        if(!response){
           return Promise.reject('Record Not Found.');
        }
       res.status(200).json({message:'Success.' ,doc:response});
    }catch(error){
        return{
            status:500,
            message:'Internla Server Error.'
        }
    }
}

module.exports = {
    create,
    getRecord,
    update,
    deleteRecord,
    getMonthlyReports
}