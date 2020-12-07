const fs = require('fs').promises;
const PATH = __dirname + '/userMOC.json';

async function readMocUser(){
    return JSON.parse( await fs.readFile(PATH, 'utf8'));
}

async function writeMocUser(usuario){
    await fs.writeFile(PATH, JSON.stringify(usuario, null, ' '));
}

module.exports = { 
                    readMocUser, 
                    writeMocUser 
                }