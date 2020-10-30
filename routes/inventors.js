const express = require('express');
const router = express.Router();
const dataInventor = require('../data/Inventor');
const verifyToken = require('./middleware');

/* Listado de todos los inventores */
router.get('/', verifyToken.verificarToken, async (req, res) => {
  const data = await dataInventor.getAllInventors();
  res.json(data); 
});

/* Un inventor especifico */
router.get('/:id', verifyToken.verificarToken, async (req, res) => {
    // res.json el estatus es 200 por defecto
    res.json(await dataInventor.getInventor(req.params.id));
});

// Alta de inventor
router.post('/', verifyToken.verificarToken, async (req, res) =>{
    const inventor = req.body;

    try {
      const result = await dataInventor.pushInventor(inventor);
      res.json(result);
    }
    catch(error) {
      res.status(500).send(error);
    }
});

module.exports = router;