const nodemailer = require("nodemailer");

function sendMail(from, to, subject, id, html, req) {
    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "gasrv1296@gmail.com", // sender user
            pass: "svazuwlffuodqkhy"// generated ethereal password
        }
    })


    const mailOptions = {
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        html

    };

    return transport.sendMail(mailOptions);
}
module.exports = {
    sendMail
}