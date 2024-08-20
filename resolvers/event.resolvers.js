const eventService = require("../services/event.services");
const db = require("../models/index");
const Event = db.Events;
const User = db.Users;

const eventResolver = {
    Mutation:{
        createEvent:async (_,{input},{user})=>{
            try {
                const {title,description,date}=input;

                if (!title ||!description ||!date) {
                    throw new Error('All fields are required');
                }

                if (!user || !user.id) {
                    throw new Error('Unauthorized - User not authenticated');
                }
                
                const newEvent = await eventService.createEvent(input,user.id);
                return newEvent;
            } catch (error) {
                console.log(`Error creating event: ${error.message}`);
                throw new Error(error.message);
            }
        },

        updateEvent:async(_,{eventId,input},{user})=>{
            try {
               
                if (!user ||!user.id) {
                    throw new Error('Unauthorized - User not authenticated');
                }
                
                const existingEvent = await Event.findByPk(eventId);
                if(!existingEvent){
                    throw new Error('Event not found');
                }

                const updateEvent = await eventService.updateEvent(eventId,input);
                return {
                    success:true,
                    message:'Event Updated Successfully',
                    event:updateEvent
                }
            } catch (error) {
                console.error(`Error updating event: ${error.message}`);
                throw new Error(error.message);
            }
        },

        inviteUser:async (_,{input},{user})=>{
            try {
                const {email,eventId} = input;

                if(!user){
                    throw new Error('Unauthorized - User not authenticated');
                }

                if(!email){
                    throw new Error('Email is required');
                }

                if(!eventId){
                    throw new Error('Event ID is required');
                }

                const event = await Event.findByPk(eventId);
                if(!event){
                    throw new Error('Event not found');
                }

                const newInvite = await eventService.inviteUser(email,eventId);
                return {
                    success:true,
                    message:'User Invited Successfully',
                    invite:newInvite
                }
            } catch (error) {
                console.error(`Error while trying to invite user: ${error.message}`);
                throw new Error(error.message);
            }
        }
    }
}

module.exports = eventResolver;