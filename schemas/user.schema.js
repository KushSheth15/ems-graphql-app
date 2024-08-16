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

    type chnagePasswordResponse{
      success:Boolean!
      message:String!
    }

    type Query{
      users:[User!]
    }

    type Mutation{
      register(input:RegisterInput!):User!
      login(input:LoginInput!):AuthLogin!
      changePassword(input:changePasswordInput!):chnagePasswordResponse!
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

    input changePasswordInput{
      currentPassword:String!
      newPassword:String!
    }

`;

module.exports = userSchema;