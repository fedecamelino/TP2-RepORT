const fs = require('fs').promises;
const PATH = __dirname + '/inventorsMOC.json';
const connection = require('./connectionMongo')

async function readMocInventor(){
    return JSON.parse( await fs.readFile(PATH, 'utf8'));
}

async function writeMocInventor(inventors){
    await fs.writeFile(PATH, JSON.stringify(inventors, null, ' '));
}

async function getAllInventors(){
    const connectionMongo = await connection.getConnection(); 
    const inventors = await connectionMongo.db('PruebaDB')
                        .collection('inventors')
                        .find()
                        .toArray();
    return inventors;
}

async function getInventor(id){
    const connectionMongo = await connection.getConnection();
    const inventor = await connectionMongo.db('PruebaDB')
                        .collection('inventors')
                        .findOne({_id: parseInt(id)})
    return inventor;
}

async function pushInventor(inventor) {
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('PruebaDB')
                        .collection('inventors')
                        .insertOne(inventor)
    return result;
}

async function updateInventor(inventor) {
    const connectionMongo = await connection.getConnection();
    const query = {_id: parseInt(inventor._id)}
    const newValues = {
        $set: {
            first: inventor.first,
            last: inventor.last,
            year: inventor.year,
            img: inventor.img
        }
    }
    const result = await connectionMongo.db('PruebaDB')
                        .collection('inventors')
                        .updateOne(query, newValues)
    return result;
}

async function deleteInventor(id) {
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('PruebaDB')
                        .collection('inventors')
                        .deleteOne({_id: parseInt(id)})
    return result;
}

module.exports = {  readMocInventor,
                    writeMocInventor,
                    getAllInventors, 
                    getInventor, 
                    pushInventor,
                    updateInventor,
                    deleteInventor
                }