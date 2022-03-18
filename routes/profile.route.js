const express = require('express');
const Profile = require('../model/profile.model');
const auth = require('../middleware/auth');
const User = require('../model/user.model');
const {check,validationResult} = require('express-validator');
const { findOneAndUpdate } = require('../model/profile.model');
const router = express.Router();

router.get('/me',auth,async(request,response,next) => {
 try{
    const profile = await Profile.findOne({user: request.user.id}).populate('user',['name','avatar']);
    if(!profile){
      return response.status(404).json({msg:'profile not found'});
    }
    return response.status(404).json(profile);
    
 }catch(err){
   return response.status(500).json({message: 'error'});
 }
});

router.post('/add-profile',[auth,[check('status','status is required').not().isEmpty(),
  check('skills','skills is required').not().isEmpty()
 ]],async(request,response)=>{
   const errors = validationResult(request);
   if (!errors.isEmpty()) {
  return response.status(400).json({ errors: errors.array() });
    }
   const{ 
     company,
     website,
     location,
     bio,
     status,
     githubusername,
     skills,
     youtube,
     facebook,
     twitter,
     instagram} =  request.body;
  const profile = {};
  profile.user = request.user.id;
  if(company){
    profile.company = company;
  }
  if(website){
    profile.website = website;
  }
  if(location){
    profile.location = location;
  }
  if(bio){
    profile.bio = bio;
  }
  if(status){
    profile.status = status;
  }
  if(githubusername){
    profile.githubusername = githubusername;
  }
  if(skills){
    profile.skills = skills.split(',').map(skills=>skills.trim());
  }
  profile.social={}
  if(youtube){
    profile.social.youtube = youtube;
  }
  if(facebook){
    profile.social.facebook = facebook;
  }
  if(twitter){
    profile.social.twitter = twitter;
  }
  if(instagram){
    profile.social.instagram = instagram;
  }
  try{
      let objectProfile = await  Profile.findOne({user:request.user.id});
      if(objectProfile)
      {
        objectProfile = await Profile.findOneAndUpdate({user:request.user.id},{$set:profile},{new:true});
        return response.status(200).json(objectProfile);
      } 
      objectProfile = new Profile(profile);
      await objectProfile.save();
      return response.status(200).json(objectProfile);
   }catch(error){
    return response.status(500).json({error:error.array});
  }
});
//get all profiles
router.get('/view',async(request,response)=>{
    try{
         const profiles = await Profile.find().populate('user',['name','avatar']);
         return response.status(200).json(profiles);
    }catch(err){
      return response.status(500).json({err:err.array})
    }
});
//particular user profile
router.get('/view-user/:id',async(request,response)=>{
   try{
    const profile = await Profile.findOne({user:request.params.id}).populate('user',['name','avatar']);
     if(!profile){
      return response.status(200).json({msg:"profile no found"});
     }
    return response.status(200).json(profile);
   }catch(err){
     if(err.kind == 'ObjectId'){
      return response.status(200).json({msg:"profile no found"});
     }
    return response.status(500).json({msg:"server error"});
   }
});
//delete profiles
router.delete('/delete/:id',auth,async(request,response)=>{
  try{
       await Profile.findOneAndRemove({user:request.params.id});
       await User.findOneAndRemove({_id:request.user_id});
       return response.status(200).json({msg:"user deleted"});
  }catch(err){
    return response.status(500).json({err:err.array})
  }
});
//put means update request update profile experience
router.put('/experience',[auth,[check('title','title is required').not().isEmpty(),
check('company','company is required').not().isEmpty(),
check('from','from date is required').not().isEmpty()
]],
async (request,response)=>{
   const error = validationResult(request);
   if(!error.isEmpty()){
     return response.status(402).json({error:error.array});
   }
   const { title,company,location,description,
  from,to,current} = request.body;

  const newExp = {
    title,
    company,
    location,
    from,current,to,description
  }
  try{
  const profile = await Profile.findOne({user:request.user.id});
  profile.experience.unshift(newExp);
  await profile.save();
  return response.status(202).json(profile);
  }catch(err){
    return response.status(402).json({msg:"Server error"});
  
  }
});
//delete a particular exp in particular profile
router.delete('/delete-experience/:exp_id',auth,async(request,response)=>{
    try{
      const profile = await Profile.findOne({user:request.user.id});
      const removeIndex = profile.experience.map(item=> item.id).indexOf(request.params.exp_id);
      profile.experience.splice(removeIndex,1);
      await profile.save();
      return response.status(202).json(profile);
  
    }catch(err){
      return response.status(402).json({msg:"Server error"});
  
    }
});
//education
router.put('/add-education',[auth[check('school',"school is required").notEmpty(),
    check('degree','degree is required').notEmpty(),
    check('fieldOfStudy','fieldOfStudy is required').notEmpty(),
    check('from','from is required to know about the past').notEmpty()
]],async (request,response)=>{
     const error = validationResult(request);
     if(!error.isEmpty()){
       return response.status(402).json({msg:'error empty'});
     }
     const edu = {
       school,
       degree,
       fieldOfStudy,
       from,
       to,
       description
     };
     try{
       const profile = await Profile.findOne({user:request.user.id});
       profile.education.unshift(edu);
       await profile.save();
       return response.status(500).json({msg:'education add'});
     }catch(err){
      return response.status(500).json({msg:'Server error'});
    
     }
    
});
module.exports = router;