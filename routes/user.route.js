const express = require('express');
const User = require('../model/user.model');
var  nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const router = express.Router();

router.post('/signup',(request, response) => {
    User.create({name:request.body.name, email:request.body.email
    ,password:request.body.password}).then(result=>{
      console.log(result);
      
      var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'devikakushwah29@gmail.com',
            pass: 'Database@29'
         }
      }));
           
     var mailOptions = {
        from: 'devikakushwah29@gmail.com',
        to: 'devikakushwah29@gmail.com',
        subject: 'checking ',
        text: 'devika sending email for project!'
      };

     transporter.sendMail(mailOptions, function (error, info) {
       if (error) {
         console.log(error);
         return response.status(500).json({msg:"Email not send"});
       } else {
        console.log('Email sent: ' + info.response);
        return response.status(200).json(result);
        
       }
     });
  
     
    }).catch(err=>{
        console.log(err);
     return response.status(500).json({msg:"Error logged"});
    });
});

module.exports = router;