const express = require('express');
const User = require('../model/user.model');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const {check,validationResult}= require('express-validator');
const router = express.Router();

router.post('/signup',check('name','Name is required').notEmpty(),
check('email','Please include a valid email address').isEmail(),
check('password','please enter a password with 6 or more characters').isLength({min:6}), 
async (request,response)=>{
   const error = validationResult(request,response);
   if(!error.isEmpty())
     return response.status(400).json({msg :"isEmpty"})
     const { name,email,password} = request.body;
     try{
      let user = await User.findOne({email});
      if(user){
        return response.status(400).json({msg:"already exists"})
      }
      
     const avatar = normalize(gravatar.url(email,{
       s:'200',
       r:'pg',
       d:'mm'
     }),{ forceHttps: true});
      user = new User({name,email,avatar,password});
      const salt = await bcrypt.genSalt(10);
      user.password=  await bcrypt.hash(password,salt);
      await user.save().then(result=>{
  return response.status(200).json(result);
      }).catch(err=>{
        return response.status(500).json({msg:"errorr found"});
      })
    //  const payload = {user:{ id:user.id}}

    // jwt.sign(
    //   payload,
    //   config.get('jwtSecret'),
    //   { expiresIn: '5 days' },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );



     }catch(error){
       return response.status(500).json({msg:"error caych"})
     }
});


module.exports = router;