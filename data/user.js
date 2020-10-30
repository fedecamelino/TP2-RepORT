const fs = require('fs').promises;
const PATH = __dirname + '/usersMOC.json';
const connection = require('./connectionMongo');

async function getUser(email){
    console.log(email)

    const connectionMongo = await connection.getConnection();
    const user = await connectionMongo.db('PruebaDB')
                        .collection('users')
                        .findOne({email: email });
    return user;
}

module.exports = {getUser}