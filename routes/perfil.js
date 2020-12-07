const express = require('express');
const router = express.Router();
const verifyToken = require('./middleware');
const dataMOCUser = require('../data/userMOC');

/* Ver perfil */
router.get('/', verifyToken.verificarToken, async (req, res) => {
  const usuarioLogin = await dataMOCUser.readMocUser()
  res.json(usuarioLogin);
});

module.exports = router;

/* Modificacion de perfil */
/* router.put('/:id', verifyToken.verificarToken, async (req, res) => {
  const perfil = req.body;
  try {
    perfil._id = req.params.id;
    const result = await dataPerfil.updatePerfil(perfil);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
 */