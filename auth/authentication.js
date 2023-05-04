const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Define a middleware function to verify JWT token
function authentication(req, res, next) {
  // Get the authorization header value
  const token = req.headers.token;

  // Check if token is undefined
  if (typeof token !== 'undefined') {
    // Verify the token using the JWT library
    let user = jwt.verify(token, process.env.JWT_SECRET);
      if (user) {
         req.user = user;
         next();
      } else {
        return res.status(404).json({ success: false, message: "invalid user" });
      }
  } else {
    // Return an error response if the authorization header is missing
    return res.status(404).json({ success: false, message: "invalid user" });
  }
}

 module.exports = authentication;
