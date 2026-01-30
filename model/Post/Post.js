const mongoose = require('mongoose');

//schema

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    author: {
        type: mongoose.Schema.Types.objectId,
        required: true,
        ref: "User",
    },
    shares: {
        type: Number,
        default: 0,
    },

     posts:  {
        type: mongoose.Schema.Types.objectId,
        ref: "Post",
    },

},
     {
      
       timestamps: true, 

     }
    );

//compile schema to model 
const Post = mongoose.model("Post",postSchema);
module.exports = Post;


