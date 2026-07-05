const bcrypt = require('bcryptjs');
const User = require('../../model/User/User'); 
const generateToken = require('../../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if username or email already exists.
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            let duplicateField = 'User';
            if (existingUser.username === username) {
                duplicateField = 'Username';
            } else if (existingUser.email === email) {
                duplicateField = 'Email';
            }

            return res.status(400).json({
                status: 'failed',
                message: `${duplicateField} already exists`,
            });
        }

        // Password hashing is handled by the User model pre-save hook.
        const newUser = new User({
            username,
            email,
            password,
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

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid login credentials',
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid login credentials',
            });
        }

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            user,
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
};