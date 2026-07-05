const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    //create payload for the user
    const payload = {
        user: {
            id: user.id
        }
    }
    //sign the token with a secret key 
    const toekn = jwt.sign(payload,'anykey',{
        expiresIn: 36000, //Expire 1hr
    });
    return token;
};

module.exports = generateToken;