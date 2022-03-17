const express = require('express');
const  Admin  = require('../model/admin.model');
const router = express.Router();

router.post('/login',(request,response)=>{
  Admin.findOne({
      email: request.body.email,
      password: request.body.password
  }).then(result=>{
      return response.status(200).json(result);
  }).catch(err=>{
      return response.status(500).json({msg:"something happened.."})
  });
});

module.exports = router;