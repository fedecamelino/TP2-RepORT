const express = require('express');
const router = express.Router();
const dataComentarios = require('../data/comentario');
const verifyToken = require('./middleware');

/* Listado de todos los Comentarios */
router.get('/', verifyToken.verificarToken, async (req, res) => {
  const data = await dataComentarios.getAllComentarios();
  res.json(data); 
});

/* Un comentario especifico */
router.get('/:id', verifyToken.verificarToken, async (req, res) => {
    // res.json el estatus es 200 por defecto
    res.json(await dataComentarios.getComentario(req.params.id));
});

/* Alta de comentario */
router.post('/', verifyToken.verificarToken, async (req, res) =>{
    const comentario = req.body;

    try {
      const result = await dataComentarios.pushComentario(comentario);
      res.json(result);
    }
    catch(error) {
      res.status(500).send(error);
    }
});

/* Modificacion de comentario -> No utilizado */
/* Crear validación que si el comentario no tiene comentarios, se puede modificar */
/* router.put('/:id', verifyToken.verificarToken, async (req, res) => {
  const comentario = req.body;
  try {
    comentario._id = req.params.id;
    const result = await dataComentarios.updateComentario(comentario);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
 */

/* Eliminacion de comentario */
router.delete('/:id', verifyToken.verificarToken, async (req, res)=>{
  try {
    const result = await dataComentarios.deleteComentario(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;