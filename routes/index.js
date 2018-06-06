var express = require('express');
var router = express.Router();


//Controllers
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Sesión
router.get('/login',  sessionController.new); 
router.post('/login', sessionController.create);
router.post('/logout', sessionController.destroy);

module.exports = router;
