const bcrypt = require('bcryptjs');
const User = require('../../model/User/User'); 

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        // Check if user already exists in the database
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                status: 'failed',      
                message: "User Already Exists",
            });
        }

        // Hash the plain password using bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            status: 'success',
            message: "User Registered Successfully",
            newUser,
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
};