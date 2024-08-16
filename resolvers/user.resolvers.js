const db = require('../models/index');
const User = db.Users;
const userService = require('../services/user.services');

const userResolver = {
    Query:{
        users:async()=>{
            try {
                const allUsers = await User.findAll({});
                return allUsers;
            } catch (error) {
                console.log(`Error fetching user: ${error.message}`);
                throw new Error('Error fetching users');
            }
        }
    },
    
    Mutation:{
        register:async (_,{input})=>{
            try {
                const {firstName,lastName,email,password} = input;

                if(!firstName || !lastName || !email || !password){
                    throw new Error ("All fields are required");
                }

                const newUser = await userService.registerUser(input);
                return newUser;
            } catch (error) {
                console.error(`Error registering user: ${error.message}`);
                throw new Error(error.message);
            }
        },

        login:async(_,{input})=>{
            try {
                const {email,password} = input;
                
                if(!email ||!password){
                    throw new Error ("Email and password are required");
                }

                const user = await userService.loginUser(input);
                return user;
            } catch (error) {
                console.log('Failed to login:', error.message);
                throw new Error(error.message);
            }
        },

        changePassword:async (_,{input},{user})=>{
            try {
                const {currentPassword,newPassword} = input;
                if(!currentPassword || !newPassword){
                    throw new Error ("Current password and new password are required");
                }

                const updatedUser = await userService.changePassword(input,user);
                return {
                    success:true,
                    message:updatedUser
                };

            } catch (error) {
                console.error(`Error changing password: ${error.message}`);
                throw new Error(error.message);
            }
        }
    }
}

module.exports = userResolver;