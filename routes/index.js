var express = require('express');
var router = express.Router();

//Preguntar por token activo
//Redirigir al login

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TP2' });
});



module.exports = router;
