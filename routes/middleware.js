var jwt = require('jsonwebtoken');

async function verificarToken(req, res, next) {
    let token = await req.header('authorization');
    token = token.replace('Bearer ','')
    console.log(token);
    try {
        jwt.verify(token, 'shhhhhh');
        next();
    } catch (error) {
        res.status(401).send("Usuario no autenticado");
    }
}

module.exports = {verificarToken}