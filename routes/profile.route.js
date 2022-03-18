const express = require('express');
const Profile = require('../model/profile.model');
const auth = require('../middleware/auth');
const User = require('../model/user.model');
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
router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);
router.post('/add-profile',[auth,[check('status','status is required').not().isEmpty(),
  check('skills','skills is required').not().isEmpty()
 ]],async(request,response)=>{
   const errors = validationResult(request);
   if (!errors.isEmpty()) {
  return response.status(400).json({ errors: errors.array() });
    }
   const{ company,website,location,bio,status,githubusername,skills,youtube,facebook,twitter,instagram}=
   request.body;
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
    profile.social.you
  }
});

module.exports = router;