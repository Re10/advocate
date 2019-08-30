const validator = require('validator');

async function validation(data) {
    console.log('Validation Function', data);
   
    if(data.caseId){
        console.log('Validation Function', data.caseId,data.caseName);
        let caseDatavalidate={
            caseId:validator.isAlphanumeric(data.caseId),
            caseName:validator.isAlpha(data.caseName)
        }
        console.log('case Data',caseDatavalidate);
        if(caseDatavalidate.caseId && caseDatavalidate.caseName){
            return caseDatavalidate;
        }
        else
        return false;

    }

    else if(data.courtName){
        let courtData={
            courtName:validator.matches(data.courtName,'^[a-zA-Z][a-zA-Z\\s]+$'),
            location:validator.matches(data.courtName,'^[a-zA-Z][a-zA-Z\\s]+$')
        }
        console.log('court valid data',courtData);
        if(courtData.location && courtData.courtName){
            return courtData;
        }
        else
        return false;

    }

    else {
        let registerData = {
            fName: validator.isAlpha(data.fName),
            lName: validator.isAlpha(data.lName),
            phoneNo: validator.isMobilePhone(data.phoneNo),
            email: validator.isEmail(data.email),
        }
        console.log('Register data', registerData);
        console.log("Email=>", registerData.email, "fname=>", registerData.fName, "lname=>", registerData.lName);

        if (registerData.fName && registerData.lName && registerData.email && registerData.phoneNo) {
            return registerData;
        }
        else
            return false;
    }
}
module.exports = {
    validation
}