require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authUtils = require('../utils/auth.utils');
const db = require('../models/index');
const User = db.Users;
const Token = db.Tokens;

const userService = {
    registerUser:async (input)=>{
        try {
            const existingUser = await User.findOne({where:{email:input.email}});
            if(existingUser){
                throw new Error('Email already exists');
            };

            const hashedPassword = await bcrypt.hash(input.password, 10);
            const user = await User.create({
                firstName:input.firstName,
                lastName: input.lastName,                
                email: input.email,
                password: hashedPassword
            });

            return user;
        } catch (error) {
            console.log(`Error Registering User: ${error.message}`);
            throw new Error(error.message);
        }
    },

    loginUser:async(input)=>{
        try {
            const {email,password} = input;
            const user = await User.findOne({where:{email}});
            
            if(!user){
                throw new Error('User not found');
            }

            isPasswordsValid = await bcrypt.compare(password,user.password);
            if(!isPasswordsValid){
                throw new Error('Invalid credentials');
            }

            const accessToken = authUtils.generateAccessToken({id:user.id,firstName:user.firstName});

            const expirationTime = new Date(Date.now() + 1*60*60*1000 );

            await Token.create({
                userId: user.id,
                token: accessToken,
                token_type:'ACCESS',
                expiresAt: expirationTime
            });

            return {user,accessToken};
        } catch (error) {
            console.error('Login Failed', error.message);
            throw new Error(error.message);
        }
    },

    changePassword:async (input,user)=>{
        try {
            const {currentPassword,newPassword} = input; 

            const isPasswordsValid = await bcrypt.compare(currentPassword, user.password);
            if(!isPasswordsValid){
                throw new Error('Invalid current password');
            };
            
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await user.update({password: hashedPassword});

            return 'Password changed successfully';
        } catch (error) {
            console.error(`Failed to change password: ${error.message}`);
            throw new Error(error.message);
        }
    },

    resetPassword: async (input)=>{
        try {
            const {email} = input;
            const user = await User.findOne({where:{email}});
            if(!user){
                throw new Error('User not found');
            }

            const resetToken = authUtils.generateResetToken({id:user.id,firstName:user.firstName})
            await Token.create({
                userId: user.id,
                token: resetToken,
                token_type:'RESET',  
                expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000)              
            });

            return {message:'Password reset request sent successfully',resetToken};
        } catch (error) {
            console.log('Password Reset Failed',error.message);
            throw new Error(error.message);
        }
    },

    updatePassword:async (input)=>{
        try {
            const {token,newPassword} = input;
            const decodedToken = jwt.verify(token,process.env.SECRET_KEY);

            const user = await User.findOne({where:{id:decodedToken.id}});
            if(!user){
                throw new Error('Invalid token or expired token');
            }

            const hashedPassword = await bcrypt.hash(newPassword,10);
            user.password = hashedPassword;
            await user.save();

            return {success: true,message:'Password Updated successfully'};
        } catch (error) {
            console.log(`Password update failed: ${error.message}`);
            throw new Error(error.message);
        }
    }
}

module.exports = userService;