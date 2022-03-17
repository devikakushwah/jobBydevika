const express = require('express');
const  Admin  = require('../model/admin.model');
const router = express.Router();

router.post('/signup',(request,response)=>{
    console.log(request.body);
  Admin.create({
      email: request.body.email,
      password: request.body.password
  }).then(result=>{
      console.log(result);
      return response.status(200).json(result);
  }).catch(err=>{
      console.log(err);
      return response.status(500).json({msg:"something happened.."})
  });
});

module.exports = router;