const db = require("../models/index");
const User = db.Users;
const Event = db.Events;
const Invite = db.Invites;

const eventService = {
    createEvent:async (input,userId)=>{
        try {
            if(!userId){
                throw new Error('User not authenticated');
            }

            const {title,description,date}=input;
            const newEvent = await Event.create({
                title,
                description,
                date,
                userId
            });
            return newEvent;
        } catch (error) {
            console.log(`Failed to create event: ${error,message}`);
            throw new Error(error.message);
        }
    },

    updateEvent:async (eventId,input)=>{
        try {
            const {title,description,date} = input;
            const eventUpdate = await Event.update(
                {title,description,date},
                {where: {id: eventId}}
            );
            if(eventUpdate[0]===0){
                throw new Error('Event not found');
            }

            const updatedEvent = await Event.findByPk(eventId);
            return updatedEvent;
        } catch (error) {
            console.error(`Failed to update event:${error.message}`);
            throw new Error(error.message);
        }
    },

    inviteUser:async (email,eventId)=>{
        try {
            const inviteUser = await User.findOne({where:{email}});
            if (!inviteUser) {
                throw new Error("User not found ");
            }

            const event = await Event.findByPk(eventId);
            if (!event) {
                throw new Error("Event not found ");
            }

            const invite = await Invite.create({
                email,
                userId:inviteUser.id,
                eventId:eventId.id
            });

            return invite;

        } catch (error) {
            console.error(`Error inviting user to the event: ${error.message}`);
            throw new Error(error.message);
        }
    }
}

module.exports = eventService;