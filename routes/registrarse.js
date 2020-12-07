const express = require('express');
const router = express.Router();
const dataUser = require('../data/user');
const invalidUserName = "El email elegido ya existe"

/* Alta de usuario */
router.post('/', async (req, res) => {
    const user = req.body;
    try {
        const usuarioRegistrado = await dataUser.getUser(user.email);
        if (usuarioRegistrado == null) {
            user["_id"] = await dataUser.autoGenerateId();
            const result = await dataUser.pushUser(user);
            res.json(result);
        }
        else {
            res.send(invalidUserName);
        }
      
    } catch (error) {
      res.status(500).send(error);
    }
});

module.exports = router;