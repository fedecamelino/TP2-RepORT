const fs = require('fs').promises;
const connection = require('./connectionMongo');

async function getUser(email){
    const connectionMongo = await connection.getConnection();
    const user = await connectionMongo.db('RepORT')
                        .collection('users')
                        .findOne({email: email });
    return user;
}

async function autoGenerateId() {
    const connectionMongo = await connection.getConnection();
    const nextId = await connectionMongo.db('RepORT')
                        .collection('users')
                        .find()
                        .count() + 1;
    console.log("Proximo usuario.. id = ", nextId);
    return nextId;
}

async function pushUser(user) {
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('RepORT')
                        .collection('users')
                        .insertOne(user)
    return result;
}


module.exports = { 
                    getUser, 
                    autoGenerateId, 
                    pushUser 
                }