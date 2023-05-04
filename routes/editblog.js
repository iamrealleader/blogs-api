const express = require('express');
const authentication = require("../auth/authentication");
const Blog = require("../schemas/Blog");
const fetch = require("node-fetch");
const router = express.Router();

router.post('/editblog', authentication , async function(req, res) {
  try {
    const {id} = req.query;
    const token = req.headers.token.toString().trim();
    const {url,title,catagorie,description} = req.body;
    if (!title || !catagorie || !description) {
      return res.status(404).json({success : false , msg : "please fill the following inputs"});
    }

    let {user} = req.user;
    if(user){

      let validUrl;
      try {
        const response = await fetch(url);
        if (response.status === 200) {
          validUrl = url;
        } else {
          validUrl =
            "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
        }
      } catch (error) {
        validUrl =
          "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
      }
      const blog = await Blog.findByIdAndUpdate({_id : id},{url:validUrl,title,email : user.email,auther : user.name,catagorie,description}, {new : true,upsert : true});
      return res.status(200).json({success : true , msg : "Blog updated Successfully!"});
         }
    else{
      return res.status(404).json({success : false , msg : "User not found!"});
    }
    
  } catch (error) {
    return res.status(500).json({success : false , msg : "Error while updating blogs!"});
  }
});

module.exports = router;