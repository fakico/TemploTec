var nodemailer = require('nodemailer');    
var Q = require('q');

//http://www.onlinehtmleditor.net/
//https://github.com/niftylettuce/node-email-templates
//https://github.com/andris9/Nodemailer
//https://nodemailer.com/

// create reusable transporter object using SMTP transport
var smtpOptions = {
    host: process.env.TEMPLOTEC_SMTP,
    port: process.env.TEMPLOTEC_SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.TEMPLOTEC_EMAIL_ACCOUNT,
        pass: process.env.TEMPLOTEC_EMAIL_PASSWORD
    }
};
var transporter = nodemailer.createTransport(smtpOptions);

function EmailHelper(){

    var senderAddress = "informes@templotec.com";

    /**
     * Sends an email with activation link
     * @param {Object} account
     * @param {string} account.name
     * @param {string} account.email
     * @param {string} account.activationCode
     */
    function sendInfo(names, email, message){

        var htmlContent = 
            "<label>Nombres:</label>" + "<b>{0}</b>" +
                        "<br/>" +
            "<label>Correo:</label>" + "<b>{1}</b>" +
                        "<br/>" +
            "<label>Mensaje:</label>" + "<b>{2}</b>";

        htmlContent = htmlContent.replace('{0}', names);
        htmlContent = htmlContent.replace('{1}', email);
        htmlContent = htmlContent.replace('{2}', message);

        var d = Q.defer();
        
        var mailOptions = {
            from: senderAddress,
            to: senderAddress,
            subject: "Solicitud de informes",
            html: htmlContent
        };
        transporter.sendMail(mailOptions, function(error, info){
           if(error){
               d.reject(error);
           }else{
               d.resolve(info); //todo: pending to validate status
           }
        });
        return d.promise;
    }   

    return {
        sendInfo: sendInfo
    }
}

module.exports = new EmailHelper()
