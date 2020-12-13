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