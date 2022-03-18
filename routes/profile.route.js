const express = require('express');
const router =  express.Router();
const Profile = require('../model/profile.model');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user ente

// router.post('/add-profile',(request,response)=>{
 
// });

router.get('/me', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']);
  
      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }
  
      return res.status(200).json(profile);
    } catch (err) {
      res.status(500).json({err:err.array});
    }
  });
module.exports =router;