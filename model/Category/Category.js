const mongoose = require('mongoose');

//schema

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        deafult: "",

    },
    claps: {
        type: Number,
        default: 0,
    },
    content: {
        type: String,
        required: true,

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
    postViews: {
        type: Number,
        default: 0,
    },
     category: {
        type: mongoose.Schema.Types.objectId,
        required: true,
        ref: "Category",
    },
    scheduledPublished: {
        type: Date,
        default: null,
    },

     likes:  [
        {
        type: mongoose.Schema.Types.objectId,
        ref: "User",
    },
     ],

     dislikes: [
        {
        type: mongoose.Schema.Types.objectId,
        ref: "User",
    },
     ],
     comments: [
     {
        type: mongoose.Schema.Types.objectId,
        required: true,
        ref: "User",
    },
    ],
},
     {
      
       timestamps: true, 

     }
    );

//compile schema to model 
const Category = mongoose.model("Category",categorySchema);
module.exports = Category;


