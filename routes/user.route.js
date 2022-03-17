const express = require('express');
const User = require('../model/user.model');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/signup',(request, response) => {
    User.create({name:request.body.name, email:request.body.email
    ,password:request.body.password}).then(result=>{
      console.log(result);
      const email = request.body.email;
      var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'devikakushwah29@gmail.com',
         pass: 'Database@29'
       }
     });
   
     var mailOptions = {
       from: 'devikakushwah29@gmail.com',
       to: email,
       subject: 'checking ',
       text: 'devika sending email for project!'
     };
   
     transporter.sendMail(mailOptions, function (error, info) {
       if (error) {
         console.log(error);
         return response.status(500).json({msg:"Error logged"});
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