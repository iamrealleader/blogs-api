const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
const User = require("../schemas/User");

router.post('/signup' , async function(req, res) {
  try {
    const {name,email,password} = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({success : false , msg : "please fill the following inputs"});
    }
    let encryptedPass = await bcrypt.hash(password,10);
    const match = await User.findOne({email});
    if(match){
      return res.status(400).json({success : false , msg : "User with this Email Already Exists!"});
    }
    const user = new User({name,email,password : encryptedPass}); 
    await user.save();
     
    const token = jwt.sign({user},process.env.JWT_SECRET);
    return res.status(200).json({token,email, success : true , msg : 'Sign up Successfully!'});
  } catch (error) {
    return res.status(500).json({success : false , msg : "Error while Sign-Up!"});
  }
});

module.exports = router;