const express = require('express');
const auth = require('../middleware/auth');
const User = require('../model/user.model');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
     return res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
     return  res.status(500).json({msg:'Server Error'});
    }
  });

module.exports = router;