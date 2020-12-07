const express = require('express');
const router = express.Router();
const dataTemas = require('../data/tema');
const dataComentarios = require('../data/comentario');
const dataMOCUser = require('../data/userMOC');
const verifyToken = require('./middleware');
const invalidTituloTema = "El titulo del tema ya existe";
const invalidTemaModification = "No se puede modificar el tema ya que contiene comentarios asociados";
const invalidUserCreator = "Usuario no autorizado, sólo el usuario creador puede borrar el comentarios";

/* Listado de todos los temas */
router.get('/', verifyToken.verificarToken, async (req, res) => {
  const data = await dataTemas.getAllTemas();
  res.json(data); 
});

/* Ver un tema especifico */
router.get('/:id', verifyToken.verificarToken, async (req, res) => {
  const idTema = req.params.id;
  const tema = await dataTemas.getTema(idTema);
  const comentariosTotales = await dataComentarios.getAllComentarios();
  const comentarios = comentariosTotales.filter(comentario => comentario._idTema == idTema);
  res.json({tema: tema, comentarios: comentarios});
});

/* Alta de tema */
router.post('/', verifyToken.verificarToken, async (req, res) => { 
  const tema = req.body;
  try {
    const temaNuevo = await dataTemas.getTituloTema(tema.titulo);
    console.log(temaNuevo);
    if (temaNuevo == null) {
      tema["_id"] = await dataTemas.autoGenerateId();
      const userActual = await dataMOCUser.readMocUser();
      tema["email"] = userActual.email;
      const result = await dataTemas.pushTema(tema);
      res.json(result);
    }
    else {
      res.send(invalidTituloTema);
    }
  }
  catch(error) {
    res.status(500).send(error);
  }
});

/* Modificacion de tema */
router.put('/:id', verifyToken.verificarToken, async (req, res) => {
  const tema = req.body;
  try {
    tema._id = req.params.id;
    const comentario = await dataComentarios.getComentario(tema._id);
    if (comentario == null) {
      const result = await dataTemas.updateTema(tema);
      res.json(result);
    }
    else {
      res.status(401).send(invalidTemaModification);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/* Alta de Comentario */
router.post('/:idtema', verifyToken.verificarToken, async (req, res) => {
  const comentario = req.body;
  try {
    comentario["_id"] = await dataComentarios.autoGenerateId();
    comentario["_idTema"] = parseInt(req.params.idtema);
    const user = await dataMOCUser.readMocUser();
    comentario["usuario"] = user.email;
    const result = await dataComentarios.pushComentario(comentario);
    res.json(result);
  } catch(error) {
    res.status(500).send(error);
  }
});

/* Eliminacion de Comentario */
router.delete('/:idtema/:idcomment', verifyToken.verificarToken, async (req, res)=>{
  try {
    const userActual = await dataMOCUser.readMocUser();
    const comentario = await dataComentarios.getComentarioId(req.params.idcomment);
    if (userActual.email == comentario.usuario) {
      const result = await dataComentarios.deleteComentario(req.params.idcomment);
      res.send(result);
    }
    else {
      res.status(401).send(invalidUserCreator);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;