require('dotenv').config();
const express = require('express');
const {ApolloServer} = require("apollo-server-express");
const {mergeTypeDefs,mergeResolvers} = require('@graphql-tools/merge')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const userSchema = require('./schemas/user.schema');
const userResolver = require('./resolvers/user.resolvers');
const contextMiddleware = require('./middlewares/context');
const db = require('./models/index');

const PORT = process.env.PORT;
const app = express();

async function startApollo(){
    const schema = makeExecutableSchema({
        typeDefs:mergeTypeDefs([userSchema]),
        resolvers:mergeResolvers([userResolver])
    });

    const server = new ApolloServer({
        schema,
        context: contextMiddleware,
    });

    await server.start();
    server.applyMiddleware({app});
}

async function startServer(){
    try {
        await startApollo();
        await db.sequelize.sync();
        console.log("Synced DB");

        app.listen(PORT,()=>{
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('Failed to start server:', error.message)
    }
}

startServer();