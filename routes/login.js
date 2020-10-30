const express = require('express');
const router = express.Router();
const dataUsers = require('../data/user');
var jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const user = req.body;

  try {

    //Buscar usuario-objeto
    const usuarioLogin = await dataUsers.getUser(user.email);

    if (usuarioLogin == null) {res.send("Usuario y/o contraseña invalida");}
    else {
      //console.log(usuarioLogin);
    
      //Validar contraseña de usuario valido
      const valido = validarPassword(usuarioLogin, user);
      console.log(valido)

      //Si es valido, generar token
      if (!valido) {
        res.send("Contraseña invalida")
      } else {
        //res.json(usuarioLogin);
        console.log("generando token...");
        const token = generarToken(usuarioLogin);
        res.send(token);
        console.log(token);
      }
    }
    
  } catch (error) {
    res.status(500).send(error);
  }
});

//Autenticar usuario
function validarPassword(userDB, userIngresado) {
  console.log(userDB)
  console.log(userIngresado.password)
  if (userDB.password === userIngresado.password) {
    console.log(userDB.password)
    console.log(userIngresado.password)
    return true
  }
  else return false
 }

//Generar token
function generarToken(usuario) {
  const token = jwt.sign({ foo: usuario.email }, 'shhhhhh', { expiresIn : 60 });
  return token;
}

module.exports = router;