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
      return response.status(200).render(result);
  }).catch(err=>{
      console.log(err);
      return response.status(500).render({msg:"something happened.."})
  });
});

module.exports = router;