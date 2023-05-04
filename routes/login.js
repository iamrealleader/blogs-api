const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
const User = require("../schemas/User");

router.post('/login', async function(req, res) {
  try {
    const {email,password} = req.body;
    if (!email && !password) {
      return res.status(404).json({success : false , msg : "please fill the following inputs"});
    }
    const match = await User.findOne({email});
    if(match){
        let encryptedPass = await bcrypt.compare(password,match.password);
            if(encryptedPass){
                const token = jwt.sign({user : match},process.env.JWT_SECRET);
                return res.status(200).json({token ,email, success : true , msg : 'Login in Successfully!'});
            }
            else{
                return res.status(400).json({success : false , msg : 'Email or password is Wrong!'});
            }
         }
    else{
      return res.status(400).json({success : false , msg : 'Email or password is Wrong!'});
    }
    
  } catch (error) {
    return res.status(500).json({success : false , msg : "Error while Login"});
  }
});

module.exports = router;