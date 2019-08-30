const advocateModel = require('./model');
const get = require('lodash/get');
const jwt=require('jsonwebtoken')
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

        let record = await advocateModel.findOne({ 'email': get(req, 'body.email', '') });
        if (record) {
            return res.send( 'Email Already Present.');
        }
        let saveResponse=await advocateData.save();
        if(!saveResponse){
            throw new Error('Document Not Save.')
        }
     
       let payload=({subject:saveResponse._id});
       let token=jwt.sign(payload,'secretkey');
       console.log("token===>",token);

      return res.status(200).json({ message: 'document successfully inserted.' ,doc:token});
        } catch (error) {
        console.log("Error Occur in create function", error);
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    }
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
        return res.status(200).json({ status:200 , message: 'success', doc: record });
        
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
              return res.send('Record Not Found.');
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
           return Promise.reject('Record Not Found.');
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
