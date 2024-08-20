const { gql } = require('apollo-server-express');

const userSchema = gql`

    type User{
      id:ID!
      firstName:String!
      lastName:String!
      email:String!
      password:String!
    }

    type AuthLogin{
      user:User!
      accessToken:String!
    }

    type ChangePasswordResponse{
      success:Boolean!
      message:String!
    }

    type ResetPasswordResponse{
      message:String!
      resetToken:String!
    }

    type UpdatePasswordResponse{
      success:Boolean!
      message:String!
    }

    type Query{
      users:[User!]
    }

    type Mutation{
      register(input:RegisterInput!):User!
      login(input:LoginInput!):AuthLogin!
      changePassword(input:ChangePasswordInput!):ChangePasswordResponse!
      resetPassword(input:ResetPasswordInput!):ResetPasswordResponse!
      updatePassword(input:UpdatePasswordInput!):UpdatePasswordResponse!
    }

    input RegisterInput{
      firstName:String!
      lastName:String!
      email:String!
      password:String!
    }

    input LoginInput{
      email:String!
      password:String!
    }

    input ChangePasswordInput{
      currentPassword:String!
      newPassword:String!
    }

    input ResetPasswordInput{
      email:String!
    }

    input UpdatePasswordInput{
      token:String!
      newPassword:String!
    }

`;

module.exports = userSchema;