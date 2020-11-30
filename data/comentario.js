const fs = require('fs').promises;
//const PATH = __dirname + '/comentariosMOC.json';
const connection = require('./connectionMongo')

/* async function readMocComentario(){
    return JSON.parse( await fs.readFile(PATH, 'utf8'));
}

async function writeMocComentario(comentarios){
    await fs.writeFile(PATH, JSON.stringify(comentarios, null, ' '));
} */

async function getAllComentarios(){
    const connectionMongo = await connection.getConnection(); 
    const comentarios = await connectionMongo.db('RepORT')
                        .collection('comentarios')
                        .find()
                        .toArray();
    return comentarios;
}

async function getComentario(id){
    const connectionMongo = await connection.getConnection();
    const comentario = await connectionMongo.db('RepORT')
                        .collection('comentarios')
                        .findOne({_id: parseInt(id)})
    return comentario;
}

async function pushComentario(comentario) {
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('RepORT')
                        .collection('comentarios')
                        .insertOne(comentario)
    return result;
}

async function updateComentario(comentario) {
    const connectionMongo = await connection.getConnection();
    const query = {_id: parseInt(comentario._id)}
    const newValues = {
        $set: {
            first: comentario.first,
            last: comentario.last,
            year: comentario.year,
            img: comentario.img
        }
    }
    const result = await connectionMongo.db('RepORT')
                        .collection('comentarios')
                        .updateOne(query, newValues)
    return result;
}

async function deleteComentario(id) {
    const connectionMongo = await connection.getConnection();
    //Agregar validacion que solo el usuario propietario puede borrar comentario, sino devuelve denegado
    const result = await connectionMongo.db('RepORT')
                        .collection('comentarios')
                        .deleteOne({_id: parseInt(id)})
    return result;
}

module.exports = {  readMocComentario,
                    writeMocComentario,
                    getAllComentarios, 
                    getComentario, 
                    pushComentario,
                    updateComentario,
                    deleteComentario
                }