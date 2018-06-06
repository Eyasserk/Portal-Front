var express = require('express');
var router = express.Router();


//Controllers
var sessionController = require('../controllers/session_controller');
var expedienteController = require('../controllers/expediente_controller');
var licenciaController = require('../controllers/licencia_controller');

/* GET home page. */
router.use('/my/*', sessionController.loginRequired);

router.get('/', function(req, res, next) {
  res.render('index');
});

// Sesión
router.get('/login',  sessionController.new); 
router.post('/login', sessionController.create);
router.post('/logout', sessionController.destroy);

// Expedientes
router.get('/cases', expedienteController.list);

// Licencias
router.get('/licenses', licenciaController.list);

// Solicitud
router.get('/request', function(req,res,next){
	res.render('request/index');
});

module.exports = router;
