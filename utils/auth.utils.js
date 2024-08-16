const expiresIn = process.env.TOKEN_EXPIRATION
const jwt = require("jsonwebtoken");
const auth_config = require("../config/auth.config");

const generateAccessToken = (payload)=>{
    return jwt.sign(payload, auth_config.secret, { expiresIn });
};

const generateResetToken = (payload)=>{
    return jwt.sign(payload, auth_config.secret, { expiresIn });
};

module.exports = {
    generateAccessToken,
    generateResetToken
}