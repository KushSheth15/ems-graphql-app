const { gql } = require("apollo-server-express");

const eventSchema = gql`
    scalar Date

    type Users {
        id:ID!
        firstName:String!
        lastName:String!
        email:String!
        password:String!
    }

    type Event {
        id:ID!
        title:String!
        description:String!
        date:Date!
        user:Users!
    }

    type Invite{
        id:ID!
        email:String!
        eventId:ID!
    }

    input CreateEventInput{
        title:String!
        description:String!
        date:Date!
    }

    type UpdateEvent{
        success:Boolean!
        message:String!
        event:Event
    }

    input UpdateEventInput{
        title:String
        description:String
        date:Date
    }

    input InviteUserInput{
        email:String!
        eventId:ID!
    }

    type InviteUserResponse{
        success:Boolean!
        message:String!
        invite:Invite
    }

    type Mutation{
        createEvent(input:CreateEventInput!):Event!
        updateEvent(eventId:ID!, input:UpdateEventInput!):UpdateEvent!
        inviteUser(input:InviteUserInput!):InviteUserResponse!
    }
`

module.exports = eventSchema;