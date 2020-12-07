const fs = require('fs').promises;
const connection = require('./connectionMongo');

async function autoGenerateId(){
    const connectionMongo = await connection.getConnection();
    const nextId = await connectionMongo.db('RepORT')
                        .collection('temas')
                        .find()
                        .count() + 1;
    return nextId;
}

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

async function getTituloTema(titulo){
    const connectionMongo = await connection.getConnection();
    const tituloTema = await connectionMongo.db('RepORT')
                        .collection('temas')
                        .findOne({ titulo: titulo })
    return tituloTema;
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
            titulo: tema.titulo,
            descripcion: tema.descripcion,
            categoria: tema.categoria
        }
    }
    const result = await connectionMongo.db('RepORT')
                        .collection('temas')
                        .updateOne(query, newValues)
    return result;
}

async function deleteTema(id) {
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('RepORT')
                        .collection('temas')
                        .deleteOne({_id: parseInt(id)})
    return result;
}

module.exports = {  
                    autoGenerateId,
                    getAllTemas, 
                    getTema,
                    getTituloTema, 
                    pushTema,
                    updateTema,
                    deleteTema
                }