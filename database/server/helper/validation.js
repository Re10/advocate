const validator = require('validator');

async function validation(data) {
    console.log('Validation Function', data);
   
    if (data.officeAddress) {
        console.log('within adv.');
        let advocateData = {
            officeAddress: validator.isAlphanumeric(data.officeAddress),
            //advocateskills: validator.isLength(data.advocateskills, { min: 1 }),
            name: validator.isAlpha(data.name),
            phoneNo: validator.isMobilePhone(data.phoneNo),
            email: validator.isEmail(data.email),
        }
        console.log(data);
        console.log('advocate data', advocateData);
        if ( advocateData.name && advocateData.email && advocateData.phoneNo 
            && advocateData.officeAddress && advocateData.advocateskills ) {
            console.log('valid');
            return advocateData;
        }
        else
            return false;
    }

    else if(data.caseId){
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
            // courtId:validator.isAlphanumeric(data.courtId),
            courtName:validator.isAlpha(data.courtName),
            location:validator.isAlpha(data.location)
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