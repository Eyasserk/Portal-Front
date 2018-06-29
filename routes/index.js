var express = require('express');
var router = express.Router();


//Controllers
var sessionController = require('../controllers/session_controller');
var expedienteController = require('../controllers/expediente_controller');
var licenciaController = require('../controllers/licencia_controller');
var messageController = require('../controllers/message_controller');
var notificationController = require('../controllers/notification_controller');
var parcelaController = require('../controllers/parcela_controller');

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
router.get('/my/cases', expedienteController.myCases);


// Parcelas
router.get('/cases/:expedienteId/area', parcelaController.show);

// Licencias
router.get('/licenses', licenciaController.list);
//router.get('/my/licenses', licenciaController.);

// Solicitud
router.get('/request', function(req,res,next){
	res.render('request/index');
});

// Mensajes
router.get('/my/messages/:threadId', messageController.show);
router.post('/my/messages/:threadId', messageController.add);
router.post('/my/messages', messageController.create);

// Notificaciones
router.put('/my/notifications/:notificationId', notificationController.update);

module.exports = router;
