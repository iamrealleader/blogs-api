const mongoose = require("mongoose");

const blogSchema  = new mongoose.Schema({
            email:{
                type : String,
                required : true,
            },
            auther:{
                type : String,
                required : true,
            },
            url :{
                type : String,
                default : "insert"
            },
            title:{
                type : String,
                required : true,
            },
            description:{
                type : String,
                required : true,
            },
            catagorie:{
                type : String,
                default : "All"
            }
        },
        {
            timestamps : true
        }
        );

const Blog = mongoose.models.Blog || mongoose.model("Blog",blogSchema);
module.exports = Blog;
