const advocateModel = require('./model');
const get = require('lodash/get');
const { validationService } = require('../../helper');
async function create(req, res) {
    try {
        console.log('Advocate Deatils', get(req, 'body', ''), "file is:", get(req, 'file', ''));
        let advocateData = new advocateModel();
        advocateData.name = get(req, 'body.name', '');
        advocateData.phoneNo = get(req, 'body.phoneNo', '');
        advocateData.officeAddress = get(req, 'body.officeAddress', '');
        advocateData.email = get(req, 'body.email', '');
        advocateData.advocateskills = get(req, 'body.advocateskills', '');
        advocateData.image = get(req, 'file.filename', '');

        let validationServiceResponse = await validationService.validation(get(req, 'body', ''));
        if (validationServiceResponse === false) {
            throw new Error('Validation Fail');
        }
        console.log('after validation.');
        let record = await advocateModel.findOne({ 'email': get(req, 'body.email', '') });
        if (record) {
            throw new Error('Email Already Present.');
        }
        console.log('after validation.',record);
       let saveFunction= await advocateData.save();
       if(!saveFunction){
           throw new Error('Doc not save');
       }
      
        res.status(200).json({ message: 'document successfully inserted.' });
        return {
            status: 200,
            message: 'Document Save Successfully .'

        };
    } catch (error) {
        console.log("Error Occure in create function", error);
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    };


}

async function getRecord(req, res) {
    try {
        console.log('All Records', req);
        const record = req.query.id ?
            await advocateModel.findOne({ _id: req.query.id, 'flag': true }).exec() :
            await advocateModel.find({ flag: 'true' }).exec();

        if (!record) {
            return Promise.reject('Record Not Found.');
        }
        res.status(200).json({ status: 'success', message: 'success', doc: record });
        return {
            status: 200,
            message: 'Success.'
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
        console.log('Update Record', get(req, 'body', ''), 'Id', req.query.id);
        let response = await advocateModel.findOne({ '_id': req.query.id, 'flag': true });

        if (!response) {
            return Promise.reject('Record Not Found.');
        }

        let validationServiceResponse = await validationService.validation(get(req, 'body', ''));
        if (validationServiceResponse === false) {
            throw new Error('Validation Fail');
        }

        response.name = get(req, 'body.name', '');
        response.phoneNo = get(req, 'body.phoneNo', '');
        response.officeAddress = get(req, 'body.officeAddress', '');
        response.email = get(req, 'body.email', '');
        response.advocateskills = get(req, 'body.advocateskills', '');
        response.image = get(req, 'file.filename', '');
        res.status(200).json({ message: 'document successfully updated.' });
        await response.save();
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
async function deleteOne(req, res) {
    try {
        console.log('Delete Record', req.query.id);
        let record = await advocateModel.findById({ '_id': req.query.id });
        if (!record) {
            throw new Error('Record Not Found.');
        }
        console.log('record is');
        record.flag = false;
        await record.save();
        res.status(200).json({ message: 'document successfully deleted.' });
        return {
            status: 200,
            message: 'Delete Successful.'
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
    deleteOne
}
