const User = require('../../model/User/User'); 

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

// @desc    Register a new user
// @route   POST /api/v1/users/login
// @access  Public

exports.login = async(req,res) => {
    try {
        //? get the login details
        const {username,password} = req.body;
        //! check if exists 
        const user = await User.findOne({username});
        if(!user) {
            throw new Error("Invalid login credentials");
        }

        //cpmpare the hashed password with the one the request
        const isMatched = await bcrypt.compare(password,user?.password);
        if(!isMatched) {
            throw new Error("Invalid login credentials");
        }

        //Update the last login 
        user.lastlogin = new Date();
        res.json({
            status: "success",
            user,
        });

    }catch(error) {
        res.json({
            status: "failed",
            message: error?.message
        })
}