const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register',async (req,res)=>{
try {
    const {username, email, password} = req.body;

      const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

    if(existingUser) return res.status(400).json({message:'username or email already exist'});

    const hashdPassword = await bcrypt.hash(password,10)  //TO create encrypted password 10 is a value of hardness it can be 11,12 more..
    const user = new User({username,email,password:hashdPassword})

        const saveUser = await user.save();
        res.json(saveUser);  
} catch (error) {
    res.status(500).json({message:error.message});
}
})

router.post('/login',async (req,res)=>{
   try {
     const {email,password} = req.body;
    const user = await User.findOne({ email });
   
    if(!user) return res.status(404).json({message:'user not found'});

    const isMatch = await bcrypt.compare(password,user.password);
    
     if(!isMatch) return res.status(400).json({message:'Incorrect Password'});

     const token =jwt.sign({userId:user._id,userName:user.username, email: user.email},
        process.env.JWT_SECRATE_KEY,
        {expiresIn:'30m'}
     )
    
     res.json({token});
   } catch (error) {
       res.status(500).json({message:error.message});
   }
})



// router.post('/logout',async (req,res)=>{

//     try {
        
//         res.json({message:"logout successfully"});
//     } catch (error) {
        
//     }
// })


module.exports = router;