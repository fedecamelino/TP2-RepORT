const express = require('express');
const router = express.Router();
const dataTemas = require('../data/tema');
const verifyToken = require('./middleware');

/* Listado de todos los temas */
router.get('/', verifyToken.verificarToken, async (req, res) => {
  const data = await dataTemas.getAllTemas();
  res.json(data); 
});

/* Un tema especifico */
router.get('/:id', verifyToken.verificarToken, async (req, res) => {
    // res.json el estatus es 200 por defecto
    res.json(await dataTemas.getTema(req.params.id));
});

/* Alta de tema */
router.post('/', verifyToken.verificarToken, async (req, res) =>{
    const tema = req.body;

    try {
      const result = await dataTemas.pushTema(tema);
      res.json(result);
    }
    catch(error) {
      res.status(500).send(error);
    }
});

/* Modificacion de tema */
/* Crear validación que si el tema no tiene comentarios, se puede modificar */
/* router.put('/:id', verifyToken.verificarToken, async (req, res) => {
  const tema = req.body;
  try {
    tema._id = req.params.id;
    const result = await dataTemas.updateTema(tema);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
 */

/* Eliminacion de tema */
router.delete('/:id', verifyToken.verificarToken, async (req, res)=>{
  try {
    const result = await dataTemas.deleteTema(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;