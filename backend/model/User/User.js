const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

// schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["user", "admin"],
            default: "user",
        },
        password: {
            type: String,
            required: true,
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        accountLevel: {
            type: String,
            enum: ["bronze", "silver", "gold"],
            default: "bronze",
        },
        profilePicture: {
            type: String,
            default: "",
        },
        coverImage: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
        },
        location: {
            type: String,
        },
        notificationPreferences: {
            email: { type: Boolean, default: true },
        },
        gender: {
            type: String,
            enum: ["male", "female", "prefer not to say", "non binary"],
        },
        profileViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

        passwordResetToken: { type: String },
        passwordResetExpires: { type: Date },
        accountVerificationToken: { type: String },
        accountVerificationExpires: { type: Date },
    },
    {
        timestamps: true,
    }
);


userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// compile schema to model 
const User = mongoose.model("User", userSchema);
module.exports = User;