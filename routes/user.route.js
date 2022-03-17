const express = require('express');
const User = require('../model/user.model');
const router = express.Router();

router.post('/signup',(request, response) => {
    User.create({name:request.body.name, email:request.body.email
    ,password:request.body.password}).then(result=>{
      console.log(result);
      return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
     return response.status(500).json({msg:"Error logged"});
    });
});

module.exports = router;