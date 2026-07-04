const mongoose = require('mongoose');

//schema

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true,
    },
    
    postId: {
        type: mongoose.Schema.Types.objectId,
        ref: "Post",
        required: true,
    },

},
     {
      
       timestamps: true, 

     }
    );

//compile schema to model 
const Comment = mongoose.model("Comment",commentSchema);
module.exports = Comment;


