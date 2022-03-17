const express = require('express');
const  Admin  = require('../model/admin.model');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/signup',(request,response)=>{
  Admin.create(request.body).then(result=>{
      console.log(result);
      return response.status(200).render(result);
  }).catch(err=>{
      console.log(err);
      return response.status(500).render({msg:"something happenedd.."})
  })
});

module.exports = router;