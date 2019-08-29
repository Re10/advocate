
function emailTemplateProvider(templateName, token) {
    console.log('Email Template Function.');
    const emailMapper = {
        userRegistration:`<div style='border:1px solid gray;width:50%;margin:0 auto;color:black;box-shadow: 5px 10px #888888;'>
        <center><img src="http://localhost:4200/../../../" alt="image" style="width:300px"></center>
       <center><h1>Verify your email address</h1>
        <p>
        Please verify your email address so we know that it really you!.
        </p>
       Click Below Link:<br>
       <a style="background-color:#007bff; color:white;padding:10px 32px;margin-bottom:30px;text-align:center;
       text-decoration:none; display:inline-block;" href = 'http://localhost:4200/verification/${token} '><b>
       Verify My Email</b></a> <center>
       </div>`,
       verification:`<div style='border:1px solid gray;width:50%;margin:0 auto;'>
       <center><h1>Reset Your Password</h1>
       <p>Your Password Should be secure.</p>
       Click Here For Reset Password:<br>
       <a style="background-color:#007bff; color:white;padding:10px 32px;margin-bottom:30px;text-align:center;
       text-decoration:none; display:inline-block;"href = 'http://localhost:4200/reset/${token} ';"><b>
       Reset Password</b></a> <center>
       </div>`

    };

    return templateName in emailMapper ? emailMapper[templateName] : 'Template Not Found.';

}

module.exports = {
    emailTemplateProvider
}