var nodemailer = require('nodemailer');
const sendEmail = (option)=>{
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5f5eb62938dafa",
          pass: "6eabee1aae340e"
        }
      });
      var mailOptions = {
        from:"5f5eb62938dafa",
        to:option.email,
        subject:option.subject,
        html: '<p>Click <a href="'+ option.url +'' + option.message + '">here</a> email verified link</p>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}
module.exports = sendEmail