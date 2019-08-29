const courtModel = require('./model');
const get = require('lodash/get');
const { validationService } = require('../../helper');
async function create(req, res) {
    try {
        console.log(req.body);
        console.log('Court Deatail is', get(req, 'body', ''));
        let courtDetail = new courtModel();
        // courtDetail.courtId = get(req, 'body.courtId', '');
        courtDetail.courtName = get(req, 'body.courtName', '');
        courtDetail.location=get(req,'body.location','');
        courtDetail.courtType=get(req,'body.courtType','');
        let validationResponse = await validationService.validation(courtDetail);
        if (validationResponse === false) {
            return Promise.reject('Validation Fail.');
        }
        console.log('valid');
        let record = await courtModel.findOne({ 'courtName': get(req, 'body.courtName', '') });
        if (record) {
            return Promise.reject('Court Name Already Present');
        }
        await courtDetail.save();
        console.log('Document Save Successfully.');
        return {
            status: 200,
            message: 'Document Save Successfully.'
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
        let record = req.query.id ?
            await courtModel.findOne({ _id: req.query.id, 'flag': true }).exec() :
            await courtModel.find({ 'flag': true }).exec();
        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        res.status(200).json({ doc: record, message: 'Success' });
        return {
            status: 200,
            message: 'Success.',
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    }
}
async function update(req, res) {
    try {
        console.log('Court Record TO Edit.', get(req, 'body', ''), 'Id is', get(req, 'query.id', ''));
        console.log('Befor update:');
        let validationResponse = await validationService.validation(get(req, 'body', ''));
        if (validationResponse === false) {
            return Promise.reject('Validation Fail.');
        }
         
        let record = await courtModel.updateOne({ '_id': req.query.id, 'flag': true }, 
                                                { $set: { 'courtName': get(req, 'body.courtName', '') ,
                                                        'location':get(req,'body.location',''),
                                                        'courtType':get(req,'body.courtType','')} });
        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        return {
            status: 200,
            message: 'Document Update Successful.'
        }

    } catch (error) {
        return {
            status: 500,
            message: 'Inernal Server Error.'
        }
    }
}
async function deleteRecord(req, res) {
    try {
        console.log('delete Record.', get(req, 'query.id', ''));
        let record = await courtModel.findById({ '_id': req.query.id });
        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        record.flag = false;
        await record.save();
        console.log('Document Delete Successful.');
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
module.exports = {
    create,
    getRecord,
    update,
    deleteRecord
}
