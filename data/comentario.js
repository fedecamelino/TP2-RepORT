const fs = require('fs').promises;
const connection = require('./connectionMongo');

async function autoGenerateId(){
    const connectionMongo = await connection.getConnection();
    const nextId = await connectionMongo.db('RepORT')
                        .collection('comentarios')
                        .find()
                        .count() + 1;
    return nextId;
}

async function getAllComentarios(){
    const connectionMongo = await connection.getConnection(); 
    const comentarios = await connectionMongo.db('RepORT')
                        .collection('comentarios')
                        .find()
                        .toArray();
    return comentarios;
}

async function getComentario(idTema){
    const connectionMongo = await connection.getConnection();
    const comentario = await connectionMongo.db('RepORT')
                        .collection('comentarios')
                        .findOne({_idTema: parseInt(idTema)})
    return comentario;
}

async function getComentarioId(id){
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

async function deleteComentario(id) {
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('RepORT')
                        .collection('comentarios')
                        .deleteOne({_id: parseInt(id)})
    return result;
}

module.exports = {
                    autoGenerateId,
                    getAllComentarios,
                    getComentario,
                    getComentarioId,
                    pushComentario,
                    deleteComentario
                }