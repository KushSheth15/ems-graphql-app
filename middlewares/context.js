const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.Users;
const Token = db.Tokens;

const context = async ({ req }) => {
    try {  
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            const tokenrecord = await Token.findOne({ where: { token,deletedAt:null } });
            if (!tokenrecord) {
                throw new Error("Invalid token or expired token");
            }
            const user = await User.findOne({
                where: { id: decoded.id },
            });
            return { user, token };
        }
    } catch (error) {
        throw new Error(error.message);
    }
    return {};
};

module.exports = context;