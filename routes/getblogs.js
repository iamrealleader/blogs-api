const express = require('express');
const Blog = require("../schemas/Blog");
const router = express.Router();

router.get('/getblogs', async function(req, res) {
    try {
        // fetching blogs according to limit
        // if we giv limit it gives us according to it else give all latest records or blogs
        // const catagorie = req.params.catagorie;
        const query = req.query;
        let blogs;
        const { id } = query;   
        if(id){
          // then it will fetch only it 
          // if we give it an id of spacific post in headers
           blogs = await Blog.find({_id : id});
          }else{
            const { catagorie } = query;   
            let { page } = query;
            const skip = (page-1)*5
            const limit = (page)*5
            blogs = await Blog.find(catagorie === "all" ? {} : {catagorie}).skip(skip).limit(limit).sort({$natural : -1});
        }
        
        return res.status(200).json(blogs);
      
    } catch (error) {
      return res.status(500).json({success : false , msg : "Error while loading blogs!"});
    }
});

module.exports = router;