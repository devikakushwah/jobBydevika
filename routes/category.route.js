const express = require('express');
const multer = require('multer');
const Category = require('../model/category.model');
const router = express.Router();
var storage = multer.diskStorage(
    {
        destination: 'public/images',
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }
);
var upload = multer({ storage: storage });

router.post('/add-category',upload.single("image"),(request,response)=>{
    Category.create({
        name:request.body.name,
        image:"http://localhost:3000/images/"+request.file.filename
    }).then(result=>{
        console.log(result);
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);

        return response.status(500).json({msg:"Error caught"});
    })
});


router.post('/update/:id',upload.single("image"),(request,response)=>{
    
    Category.findOneAndupdateOne({_id:request.params.id},{
        $set:{
            name:request.body.name,
            image:"http://localhost:3000/images/"+request.file.filename
        }
    }).then(result=>{
       return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({msg:"error generate"});
    });
});

module.exports = router;