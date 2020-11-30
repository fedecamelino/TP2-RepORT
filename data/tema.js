const fs = require('fs').promises;
//const PATH = __dirname + '/temasMOC.json';
const connection = require('./connectionMongo')

/* async function readMocTema(){
    return JSON.parse( await fs.readFile(PATH, 'utf8'));
}

async function writeMocTema(temas){
    await fs.writeFile(PATH, JSON.stringify(temas, null, ' '));
} */

async function getAllTemas(){
    const connectionMongo = await connection.getConnection(); 
    const temas = await connectionMongo.db('RepORT')
                        .collection('temas')
                        .find()
                        .toArray();
    return temas;
}

async function getTema(id){
    const connectionMongo = await connection.getConnection();
    const tema = await connectionMongo.db('RepORT')
                        .collection('temas')
                        .findOne({_id: parseInt(id)})
    return tema;
}

async function pushTema(tema) {
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('RepORT')
                        .collection('temas')
                        .insertOne(tema)
    return result;
}

async function updateTema(tema) {
    const connectionMongo = await connection.getConnection();
    const query = {_id: parseInt(tema._id)}
    const newValues = {
        $set: {
            first: tema.first,
            last: tema.last,
            year: tema.year,
            img: tema.img
        }
    }
    const result = await connectionMongo.db('RepORT')
                        .collection('temas')
                        .updateOne(query, newValues)
    return result;
}

async function deleteTema(id) {
    const connectionMongo = await connection.getConnection();
    //Agregar validacion que solo el usuario propietario puede borrar tema, sino devuelve denegado
    const result = await connectionMongo.db('RepORT')
                        .collection('temas')
                        .deleteOne({_id: parseInt(id)})
    return result;
}

module.exports = {  //readMocTema,
                    //writeMocTema,
                    getAllTemas, 
                    getTema, 
                    pushTema,
                    updateTema,
                    deleteTema
                }