const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/',auth,(request,response)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        return response.status(200).json({user});
      } catch (err) {
        console.error(err.message);
        return response.status(500).json({msg:"error"});
      }
   
})

module.exports = router;