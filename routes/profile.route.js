const express = require('express');
const Profile = require('../model/profile.model');
const auth = require('../middleware/auth');
const User = require('../model/user');
const router = express.Router();

router.get('/',(request,response)=>{
  return response.status(200).json({msg:"bfdbfjd"});
})


// router.post('/add-profile',[auth,[check('status','status is required').not().isEmpty(),
//   check('skills','skills is required').not().isEmpty()
//  ]],async(request,response)=>{
//    const errors = validationResult(request);
//    if (!errors.isEmpty()) {
//   return response.status(400).json({ errors: errors.array() });
//     }
//    const{ company,website,location,bio,status,githubusername,skills,youtube,facebook,twitter,instagram}=
//    request.body;
//   const profile = new Profile();
//   profile.user = request.user.id;
//   if(company){
//     profile.company = company;
//   }
//   if(website){
//     profile.website = website;
//   }
//   if(location){
//     profile.location = location;
//   }
//   if(bio){
//     profile.bio = bio;
//   }
//   if(status){
//     profile.status = status;
//   }
//   if(githubusername){
//     profile.githubusername = githubusername;
//   }
//   if(skills){
//     profile.skills = skills.split(',').map(skills=>skills.trim());
//   }
//   profile.social={}
//   if(youtube){
//     profile.social.you
//   }
// });

module.exports = router;