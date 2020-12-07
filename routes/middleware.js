var jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

async function verificarToken(req, res, next) {
    let token = await req.header('authorization');
    if (token === undefined) res.status(500).send("Ingrese token de acceso");
    else {
        console.log(token);
        token = token.replace('Bearer ','');
        console.log(token);
        try {
            jwt.verify(token, secretKey);
            next();
        } catch (error) {
            res.status(401).send("Usuario no autorizado, token invalido");
        }
    }
}

module.exports = {verificarToken}