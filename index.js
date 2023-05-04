
const express = require('express');
const path = require('path');
require('dotenv').config();

const connectDb = require("./connectDb");

const signup = require("./routes/signup");
const login = require("./routes/login");
const getblogs = require("./routes/getblogs");
const editblog = require("./routes/editblog");
const createblog = require("./routes/createblog");
const delteblog = require("./routes/deleteblog");
const contact = require("./routes/contact");

const app = express()
const port = 3000;

// allow accepting of json file in req.body
app.use(express.json());

// all routes to get,create ... blogs 
app.use("/", express.static(path.join(__dirname, './homepage')));
app.use('/',signup);
app.use('/',login);
app.use('/',getblogs);
app.use('/',createblog);
app.use('/',editblog);
app.use('/',delteblog);
app.use('/',contact);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})