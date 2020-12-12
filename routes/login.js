const express = require('express');
const router = express.Router();
const dataUsers = require('../data/user');
const dataMOCUser = require('../data/userMOC');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY;
const invalidCredentials = "Usuario y/o contraseña invalida";

router.post('/', async (req, res) => {
  const user = req.body;
  try {
    const usuarioLogin = await dataUsers.getUser(user.email);
    if (usuarioLogin == null) res.send(invalidCredentials);
    else {
      const valido = validarPassword(usuarioLogin, user);
      if (!valido) res.send(invalidCredentials);
      else {
        console.log("Generando token ...");
        const token = generarToken(usuarioLogin);
        const usuario = {
          "email": usuarioLogin.email,
          "nombre": usuarioLogin.nombre,
          "apellido": usuarioLogin.apellido
        }
        dataMOCUser.writeMocUser(usuario);
        res.send(token);
        console.log(token);
      }
    }
    
  } catch (error) {
    res.status(500).send(error);
  }
});

/* Autenticar usuario */
function validarPassword(userDB, userIngresado) {
  const valido = bcrypt.compare(userIngresado.password, userDB.password);
  return valido;
}

/* Generar token */
function generarToken(usuario) {
  const token = jwt.sign({ user: usuario.email }, secretKey, { expiresIn : '7d' });
  return token;
}

module.exports = router;