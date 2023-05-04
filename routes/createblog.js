const express = require('express');
const router = express.Router();
const Blog = require("../schemas/Blog");
const authentication = require("../auth/authentication");
const fetch = require("node-fetch");

router.post('/createblog', authentication , async  function(req, res) {
  try {
    // Get the token from the request headers

    // Get the blog post data from the request body
    const { url, title, catagorie, description } = req.body;

    // Check that the required fields are provided
    if (!title || !catagorie || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all required fields" });
    }

    //  get the user from authentication middleware
    let  { user } = req.user;

    if (user) {
      // Validate the image URL
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

      // Create a new blog post object using the Blog schema
      const newBlog = new Blog({
        email: user.email,
        auther: user.name,
        url: validUrl,
        title,
        catagorie,
        description,
      });

      // Save the new blog post to the database
      const savedBlog = newBlog.save(); 

      return res
        .status(200)
        .json({ success: true, message: "Blog post created successfully" });
    } else {
      return res.status(401).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;