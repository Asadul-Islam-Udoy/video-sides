const nodemailer = require("nodemailer");

const sendMailOtp=(option)=>{
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
        html:`<h4>Your Forget password Otp Is <h1>${option.otp.toUpperCase()}</h1></h4>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}

module.exports = sendMailOtp;