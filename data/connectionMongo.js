const chalk = require('chalk');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Cadena de conexion con variable de entorno .env
const uriMongo = process.env.URIMONGO;

const client = new MongoClient(uriMongo, {useUnifiedTopology: true, useNewUrlParser:true});

async function getConnection(){
    return await client.connect().catch(err => console.log(chalk.red(err)));
}

module.exports = {getConnection};