const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/',auth,(request,response)=>{
    return response.status(200).json({msg:"auth to"});
})

module.exports = router;