const express = require('express');
const authentication = require("../auth/authentication");
const Blog = require("../schemas/Blog");
const router = express.Router();

router.delete('/deleteblog', authentication , async function(req, res) {
  try {
    const token = req.headers.token.toString().trim();
    const {id} = req.query;
    if (!token) {
      return res.status(404).json({success : false , msg : "Invalid user"});
    }

    let {user} = req.user;
    if(user){
     await Blog.findByIdAndDelete(id);
      return res.status(200).json({success : true , msg : "Blog Deleted Successfully!"});
         }
    else{
      return res.status(404).json({success : false , msg : "User not found!"});
    }
    
  } catch (error) {
    return res.status(500).json({success : false , msg : "Error while deleting blogs!"});
  }
});

module.exports = router;