const registrationModel = require('./model');
const jwt = require('jsonwebtoken');
const jwtdecodeid = require('jwt-decode');
const bcrypt = require('bcrypt');
const get = require('lodash/get');
const { validationService } = require('../../helper');
const { mailService } = require('../../helper');
const { emailTemplateProvider } = require('../../helper');
async function create(req, res) {
    try {

        console.log('New Registration ,User Details:', get(req, 'body', ''), "file is:", get(req, 'file', ''));
        let registrationData = new registrationModel();
        registrationData.fName = get(req, 'body.fName', '');
        registrationData.lName = get(req, 'body.lName', '');
        registrationData.email = get(req, 'body.email', '');
        registrationData.phoneNo = get(req, 'body.phoneNo', '');
        registrationData.image = get(req, 'file.filename', '');
        let hash = bcrypt.hashSync(get(req, 'body.password', ''), 10);
        registrationData.password = hash;
        let validationServiceResponse = await validationService.validation(get(req, 'body', ''));
        if (validationServiceResponse === false) {
            throw new Error('Validation Fail');
        }

        let registrationResponse = await registrationModel.findOne({ email: registrationData.email }).exec();
        if (registrationResponse) {
            return res.send('Email Already Present.');
        }
        let registrationSave = await registrationData.save();
        if (!registrationSave) {
            throw new Error('Data Is Not Save');
        }

        let payload = { subject: registrationSave._id };
        let token = jwt.sign(payload, 'secretkey');
        console.log('token=>', token);

        const html = await emailTemplateProvider.emailTemplateProvider('userRegistration', token);
        
        let sendMailResponse = await mailService.sendMail('gasrv1296@gmail.com', registrationData.email,
            ' Email Verification', registrationSave._id, html, req);
        if (!sendMailResponse) {
            throw new Error('Email not Found');
        }
        console.log("sendMailResponse", sendMailResponse);

        return {
            status: 200,
            message: 'Registration successfully completed.'
        };

    } catch (error) {
        console.log("Error Occure in create function", error);
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    };
}
async function verifyEmail(req, res) {
    try {
        console.log('Verify id', req.query.id);
        console.log('decode that id:');
        let decoded = jwtdecodeid(req.query.id);
        console.log("decod value=>", decoded.subject);
        let record = await registrationModel.updateOne({ '_id': decoded.subject }, { $set: { 'status': true } });
        if (!record) {
            throw new Error('Record Not Found.');
        }

        console.log('id==>', record);
        res.status(200).json({ message: 'Email Verify' });
        return {
            status: 200,
            message: 'success.'
        };


    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}
async function getAllRecord(req, res) {
    try {
        console.log('Rgistration All Records', req);

        const record = req.query.id ?
            await registrationModel.findOne({ _id: req.query.id, 'flag': true }).exec() :
            await registrationModel.find({ flag: 'true' }).exec();
            if(!record){
                throw new Error('Record Not Found.');
            }

        res.status(200).json({ status: 'success', message: 'success', doc: record });
        return {
            status: 200,
            message: 'success.'
        };
    } catch (error) {
        console.log('Error occured in get all records ', error);
        return {
            status: 500,
            message: 'Internal Server Error.'
        };
    }
}

async function checkLogin(req, res) {
    try {
        console.log('Check Emai:', get(req, 'body', ''));

        let record = await registrationModel.findOne({ 'email': get(req, 'body.email', ''), 'status': true }).exec();
        if (!record) {
            throw new Error('Email Not Present.');
        }

        let result = await bcrypt.compare(get(req, 'body.password', ''), record.password);
        if (!result) {
            throw new Error('Invalid Password');
        }

        let payload = { subject: result.email };
        let token = jwt.sign(payload, 'secretkey');
        res.status(200).json({ status: 'success', message: 'success', doc: token });

        return {
            status: 200,
            message: 'Login Successful.'
        }
    } catch (error) {
        console.log('Error occured in checklogin ', error);
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    }

}

async function resetPasswordLink(req, res) {
    try {
        console.log('Login Email:', get(req, 'body', ''));
        let record = await registrationModel.findOne({ email: req.body.email, 'flag': true });
        if (!record) {
           return Promise.reject('Record Not Found.');
        }

        let payload = { subject: record._id };
        let token = jwt.sign(payload, 'secretkey');
        console.log('token:', token);

        const html = await emailTemplateProvider.emailTemplateProvider('verification', token);

        let sendMailResponse = await mailService.sendMail('gasrv1296@gmail.com', record.email,
            ' Email Verification', record._id, html);
        console.log("sendMailResponse", sendMailResponse);
        return {
            status: 200,
            message: 'success.'
        }


    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.'
        }
    }

}
async function updatePassword(req, res) {
    try {
        console.log('Reset password', get(req, 'body', ''));
        console.log(req.query.id);
        console.log('befor decode..');
        let decoded = jwtdecodeid(req.query.id);
        console.log("decod value=>", decoded);
        let record = await registrationModel.findById({ _id: decoded.subject, 'flag': true });
        if (!record) {
            throw new Error('Record not found');
        }

        let hash = bcrypt.hashSync(get(req, 'body.password', ''), 10);

        record.password = hash;

        await record.save();
        console.log('Password Update Successful.');

        return {
            status: 200,
            message: 'Password Update Successful.'
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
        console.log('Update Registration ,User Details:', get(req, 'body', ''),
            "file is:", get(req, 'file', ''), 'Id=>', req.query.id);

        let data = await registrationModel.findById({ _id: req.query.id, 'flag': true });
        if (!data) {
            throw new Error('Record Not Found.');
        }
        let validationServiceResponse = await validationService.validation(get(req, 'body', ''));
        if (validationServiceResponse === false) {
            throw new Error('Validation Fail');
        }
        data.fName = get(req, 'body.fName', '');
        data.lName = get(req, 'body.lName', '');
        data.email = get(req, 'body.email', '');
        data.phoneNo = get(req, 'body.phoneNo', '');
        data.image = get(req, 'file.filename', '');
        let hash = bcrypt.hashSync(get(req, 'body.password', ''), 10);
        data.password = hash;

        await data.save();
        return {
            status: 200,
            message: 'success.'
        };
    } catch (error) {
        console.log('Error occured in get all records ', error);
        return {
            status: 500,
            message: 'Internal Server Error.'
        };
    }

}

async function deleteRecord(req, res) {
    try {
        console.log('Delete Record.');
        let record = await registrationModel.findById({ _id: req.query.id });
        if (!record) {
            throw new Error('Record Not Found');
        }

        record.flag = false;
        await record.save();
        res.status(200).json({ message: 'Document Delete Successful.' });
        return {
            status: 200,
            message: 'Delete Successful.'
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error.'
        };
    }
}

async function inActive(req, res) {
    try {
        console.log('status', req.query.id);
        let record = await registrationModel.updateOne({ '_id': req.query.id }, { $set: { 'status': false } });
        if (!record) {
            throw new Error('Record Not Found.');
        }

        console.log('id==>', record);
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
module.exports = {
    create,
    getAllRecord,
    checkLogin,
    resetPasswordLink,
    updatePassword,
    update,
    deleteRecord,
    verifyEmail,
    inActive

}